import { Component, OnInit } from '@angular/core';
import { Game, Player, Card, Coordinates } from './game';
import { ActivatedRoute } from '@angular/router';
import { GameRestService } from '../game-rest-service.service';
import { WebsocketService } from '../websocket.service';
import { ClipboardService } from 'ngx-clipboard';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  id: string;
  game: Game;
  gameReady: boolean = false;
  playerName: string;
  player: Player;
  playerReady: boolean = false;
  isLoaded: boolean = false;
  idCopied: boolean = false;
  chosenCards: Coordinates = new Coordinates();

  message: string;

  destroyed$ = new Subject();

  constructor(
    private websocketService: WebsocketService, 
    private gameService: GameRestService, 
    private route: ActivatedRoute,
    private clipboardService: ClipboardService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.playerName = this.route.snapshot.params['playerName']
    this.gameService.getGame(this.id).subscribe({
      error: (err) => { console.log(err) },
      next: (game : Game) => { this.game = game, this.loadGame(game, this.playerName) }
    });
    const gameSub$ = this.websocketService.connect(this.id+this.playerName).pipe(
      takeUntil(this.destroyed$)
    );
    gameSub$.subscribe(message => this.handleMessage(message));
  }

  handleMessage(message: any) {
    this.message = message;
    this.gameService.getGame(this.id).subscribe({
      error: (err) => { console.log(err) },
      next: (game : Game) => { this.loadGame(game, this.playerName) }
    });
  }

  copyText() {
    this.clipboardService.copyFromContent(this.id);
    this.idCopied = true;
  }

  setPlayer(game: Game, playerName: string) {
    for(let player of game.players) {
      if(player.name == playerName) {
        this.player = player;
      }
    }
  }

  loadGame(game: Game, playerName: string) {
    this.game = game;
    this.setPlayer(game, playerName);
    if(game.state != null) {
      this.gameReady = true;
    }
    this.isLoaded = true;
  }

  launchGame() {
    console.log("launch game");
  }

  clickOnCard(l: number, r: number) {
    if(this.chosenCards.lineCard1 == null) {
      this.chosenCards.lineCard1 = l;
      this.chosenCards.rowCard1 = r;
      this.player.board.grid[r][l].isClicked = true;
    } else if(this.chosenCards.lineCard2 == null){
      this.chosenCards.lineCard2 = l;
      this.chosenCards.rowCard2 = r;
      this.player.board.grid[r][l].isClicked = true;
      this.playerReady = true;
    }
  }
  

  declarePlayerReady() {
    this.gameService.playerReady(this.id, this.playerName, this.chosenCards).subscribe({
      error: (err) => { console.log(err) }
    });
  }

}
