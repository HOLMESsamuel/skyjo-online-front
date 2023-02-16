import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Card, Choice, Game, Player } from '../game';
import { GameRestService } from 'src/app/game-rest-service.service';
import { CardService } from 'src/app/card.service';
import { Constants } from 'src/app/constants';
import { GlobalErrorHandlerService } from 'src/app/global-error-handler.service';

@Component({
  selector: 'app-running-game',
  templateUrl: './running-game.component.html',
  styleUrls: ['./running-game.component.css', '../../../styles.css']
})
export class RunningGameComponent implements AfterContentInit, OnChanges{
  @Input() id: string;
  @Input() game: Game;
  @Input() gameReady: boolean;
  @Input() playerName: string;
  @Input() player: Player;
  @Input() isLoaded: boolean;
  @Input() gameState: string;
  choice: Choice = new Choice();
  isModalActive : boolean = false;
  typedText = ' ';
  textToType=' ';
  private timer: any;

  constructor( private gameService: GameRestService,
    private cardService: CardService,
    private globalErrorHandlerService: GlobalErrorHandlerService) {}

  ngAfterContentInit(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(this.timer);
      } else {
        this.setWelcomingText()
      }
    });
    this.setWelcomingText();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isLoaded && this.player != null && this.player.playerTurn != null && changes['player'].previousValue != null) {
      if (changes['player'] && changes['player'].previousValue.playerTurn != changes['player'].currentValue.playerTurn ) {
        this.setWelcomingText();
      }
    }
  }

  

  toogleModal() {
    this.isModalActive = !this.isModalActive;
  }

  chooseCard() {
    this.gameService.chooseCard(this.id, this.playerName, this.choice).subscribe({
      error: (err) => { this.globalErrorHandlerService.handleError(err) }
    });
  }

  playCard() {
    this.gameService.playCard(this.id, this.playerName, this.choice).subscribe({
      error: (err) => { this.globalErrorHandlerService.handleError(err) }
    });
    this.choice.choiceString = null;
  }

  chooseCardFromDeck() {
    this.choice.choiceString = Constants.DECK;
    this.chooseCard();
    this.toogleModal();
  }

  chooseDiscardedCard() {
    this.choice.choiceString = Constants.REMOVED;
    this.chooseCard();
    this.toogleModal();
  }

  choosePlaceCard() {
    this.choice.choiceString = Constants.REPLACE;
    this.toogleModal();
    this.setTextPlayingCard();
    this.typeWriter(this.textToType);
  }

  chooseDropCard() {
    this.choice.choiceString = Constants.DROP;
    this.toogleModal();
    this.setTextPlayingCard();
    this.typeWriter(this.textToType);
  }

  makeAction(l, r) {
    if(this.choice.choiceString == Constants.DROP || this.choice.choiceString == Constants.REPLACE) {
      this.choice.line = l;
      this.choice.row = r;
      this.playCard();
    }
  }

  findPlayer() : string {
    for(let player of this.game.players) {
      if(player.playerTurn == true) {
        return player.name;
      }
    }
  }

  setTextPlayingCard() {
    if(this.choice.choiceString == Constants.REPLACE) {
      this.textToType = "you picked a " + this.player.cardInHand.number + " now place it on your board."
    } else if(this.choice.choiceString == Constants.DROP) {
      this.textToType = "you dropped a " + this.player.cardInHand.number + " now choose a card to reveal."
    }
  }

  setWelcomingText() {
    if(this.player.playerTurn == true) {
      this.textToType = this.playerName + ", it is your turn ! choose a card from either the deck or the discarded cards.";
    } else {
      this.textToType = this.findPlayer() + " is playing, wait for your turn";
    }
    this.typeWriter(this.textToType);
  }

  cardColorClass(card : Card) : string {
    if(card != null) {
      card.visible = true;
      return this.cardService.cardColor(card);
    }
  }

  
  
  
   
  typeWriter(text) {
  clearTimeout(this.timer);
  this.typedText = ' ';
  let speed = Math.floor(20);
  let i = 0;
  const type = () => {
    if (i < text.length) {
      this.typedText += text.charAt(i);
      i++;
      this.timer = setTimeout(type, speed);
    }
  };
  this.timer = setTimeout(type, speed);
}

}
