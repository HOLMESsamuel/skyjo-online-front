import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { ActivatedRoute } from '@angular/router';
import { GameRestService } from '../game-rest-service.service';

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

  constructor(private service: GameRestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.playerName = this.route.snapshot.params['playerName']
    this.service.getGame(this.id).subscribe({
      error: (err) => { console.log(err) },
      next: (game : Game) => { this.game = game, this.isLoaded = true }
    });
  }

}
