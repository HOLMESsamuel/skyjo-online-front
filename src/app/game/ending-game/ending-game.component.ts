import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/card.service';
import { GameRestService } from 'src/app/game-rest-service.service';
import { Game } from '../game';

@Component({
  selector: 'app-ending-game',
  templateUrl: './ending-game.component.html',
  styleUrls: ['./ending-game.component.css']
})
export class EndingGameComponent {
  @Input() id: string;
  @Input() game: Game;
  @Input() isLoaded: boolean;
  @Input() gameState: string;

  constructor(
    private gameRestService: GameRestService,
    private router: Router,
    private cardService: CardService
  ) {

  }

  deleteGame() {
    this.gameRestService.deleteGame(this.id).subscribe({
      error: (err) => this.router.navigate(['']),
      complete: () => this.router.navigate([''])
    });
  }

  resetGame() {
    this.gameRestService.resetGame(this.id).subscribe({
      error: (err) => console.log(err)
    });
  }
}
