import { Component, Input, OnInit} from '@angular/core';
import { Game, Player, Coordinates } from '../game';
import { GameRestService } from '../../game-rest-service.service';
import { ClipboardService } from 'ngx-clipboard';
import { takeUntil, Subject } from 'rxjs';
import { CardService } from 'src/app/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preparing-game',
  templateUrl: './preparingGame.component.html',
  styleUrls: ['./preparingGame.component.css']
})
export class PreparingGameComponent {

  @Input() id: string;
  @Input() game: Game;
  @Input() gameReady: boolean;
  @Input() playerName: string;
  @Input() player: Player;
  @Input() isLoaded: boolean;
  @Input() gameState: string;
  idCopied: boolean = false;
  playerReady: boolean = false;
  chosenCards: Coordinates = new Coordinates();

  destroyed$ = new Subject();

  constructor(
    private gameService: GameRestService, 
    private clipboardService: ClipboardService, 
    private cardService: CardService) {
    }


  copyText() {
    this.clipboardService.copyFromContent(this.id);
    this.idCopied = true;
  }

  launchGame() {
    this.gameService.startGame(this.id).subscribe({
      error: (err) => { console.log(err) }
    });
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
