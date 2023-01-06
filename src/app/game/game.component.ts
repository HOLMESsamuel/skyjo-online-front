import { Component, OnInit } from '@angular/core';
import { Game, Player } from './game';
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
  playerName: string;
  player: Player;
  isLoaded: boolean = false;
  idCopied: boolean = false;

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
      next: (game : Game) => { this.game = game, this.setPlayer(game, this.playerName), this.isLoaded = true }
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
      next: (game : Game) => { this.game = game, this.isLoaded = true }
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

}
