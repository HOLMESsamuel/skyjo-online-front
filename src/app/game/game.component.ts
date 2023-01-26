import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GameRestService } from '../game-rest-service.service';
import { WebsocketService } from '../websocket.service';
import { Card, Game, Player } from './game';
import { GameDataService } from './game-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  id: string;
  game: Game;
  gameReady: boolean;
  playerName: string;
  player: Player;
  gameState: string;
  isLoaded: boolean;

  destroyed$ = new Subject();

  constructor(
    private gameDataService: GameDataService,
    private route: ActivatedRoute,
    private gameService: GameRestService,
    private websocketService: WebsocketService) {

      this.gameDataService.getId().subscribe(id => {
        this.id = id;
      })
      this.gameDataService.getPlayerName().subscribe(playerName => {
        this.playerName = playerName;
      })
      this.gameDataService.getGame().subscribe(game => {
        this.game = game;
      })
      this.gameDataService.getGameState().subscribe(gameState => {
        this.gameState = gameState;
      })
      this.gameDataService.getIsLoaded().subscribe(isLoaded => {
        this.isLoaded = isLoaded;
      })
      this.gameDataService.getPlayer().subscribe(player => {
        this.player = player;
      })
      this.gameDataService.getGameReady().subscribe(gameReady => {
        this.gameReady = gameReady;
      })
    }

  ngOnInit(): void {
    this.recoverParamsFromUrl();
    
    this.getGame();
    
    this.subscribeToWebsocket();

  }

  recoverParamsFromUrl() {
    this.gameDataService.setId(this.route.snapshot.params['id']);
    this.gameDataService.setPlayerName(this.route.snapshot.params['playerName']);
  }

  getGame() {
    this.gameService.getGame(this.id).subscribe({
      error: (err) => { console.log(err) },
      next: (game : Game) => { this.gameDataService.loadGame(game, this.playerName) }
    });
  }

  //subscribe to websocket with id : gameId + playerName which is unique
  subscribeToWebsocket() {
    const gameSub$ = this.websocketService.connect(this.id+this.playerName).pipe(
      takeUntil(this.destroyed$)
    );
    gameSub$.subscribe(message => this.handleMessage(message));
  }

  //called each time a message is received from the websocket, it will always be a json encoded game
  //recover the game from message and refresh the component game object with the received game
  handleMessage(message: any) {
    const game = JSON.parse(message);
    this.gameDataService.loadGame(game, this.playerName);
  }

}
