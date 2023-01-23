import { Component, Input } from '@angular/core';
import { Choice, Game, Player } from '../game';
import { GameRestService } from 'src/app/game-rest-service.service';

@Component({
  selector: 'app-running-game',
  templateUrl: './running-game.component.html',
  styleUrls: ['./running-game.component.css']
})
export class RunningGameComponent {
  @Input() id: string;
  @Input() game: Game;
  @Input() gameReady: boolean;
  @Input() playerName: string;
  @Input() player: Player;
  @Input() isLoaded: boolean;
  @Input() gameState: string;
  choice: Choice = new Choice();
  isModalActive : boolean = false;

  constructor( private gameService: GameRestService) {}

  toogleModal() {
    this.isModalActive = !this.isModalActive;
  }

  chooseCard() {
    this.gameService.chooseCard(this.id, this.playerName, this.choice).subscribe({
      error: (err) => { console.log(err) }
    });
  }

  playCard() {
    this.gameService.playCard(this.id, this.playerName, this.choice).subscribe({
      error: (err) => { console.log(err) }
    });
  }

  chooseCardFromDeck() {
    this.choice.choiceString = "deck";
    this.chooseCard();
    this.toogleModal();
  }

  chooseDiscardedCard() {
    this.choice.choiceString = "removed";
    this.chooseCard();
    this.toogleModal();
  }

  choosePlaceCard() {
    this.choice.choiceString = "replace";
    this.toogleModal();
  }

  chooseDropCard() {
    this.choice.choiceString = "drop";
    this.toogleModal();
  }

  makeAction(l, r) {
    if(this.choice.choiceString == "drop" || this.choice.choiceString == "replace") {
      this.choice.line = l;
      this.choice.row = r;
      this.playCard();
    }
  }

}
