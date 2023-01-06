import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { ActivatedRoute } from '@angular/router';
import { GameRestService } from '../game-rest-service.service';
import { WebsocketService } from '../websocket.service';
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
  isLoaded: boolean = false;

  message: string;

  destroyed$ = new Subject();

  constructor(
    private websocketService: WebsocketService, 
    private gameService: GameRestService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.playerName = this.route.snapshot.params['playerName']
    this.gameService.getGame(this.id).subscribe({
      error: (err) => { console.log(err) },
      next: (game : Game) => { this.game = game, this.isLoaded = true }
    });
    const gameSub$ = this.websocketService.connect(this.id).pipe(
      takeUntil(this.destroyed$)
    );
    gameSub$.subscribe(message => this.message = message);
  }

}
