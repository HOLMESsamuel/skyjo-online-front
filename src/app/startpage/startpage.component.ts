import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameRestService } from '../game-rest-service.service';
import { Game } from '../game/game';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent {

  constructor(private gameService: GameRestService, private router: Router) {}

  errorNewGame : boolean = false;
  errorNewGameMessage : string = "";

  errorJoinGame : boolean = false;
  errorJoinGameMessage : string = "";

  launchGame(name : string) {
    if(name == null || name == "") {
      this.setErrorNewGameMessage("You need to enter a name to create a game")
    } else {
      this.gameService.createGame(name).subscribe({
        error: (err) => { this.handleCreateError(err) },
        next: (game : Game) => { this.disableErrorNewGameMessage(), this.router.navigate(['games', game.id, 'player', name]) }
      });
    }
  }

  joinGame(id : string, name : string) {
    if(id == null || id == "" || name == null || name == "") {
      this.setErrorJoinGameMessage("You need to enter your name and the game ID to join it")
    } else {
      this.gameService.joinGame(id, name).subscribe({
        error: (err) => { this.handleJoinError(err) },
        next: (game : Game) => { this.disableErrorJoinGameMessage(), this.router.navigate(['games', game.id, 'player', name]) }
      });
    }
  }

  setErrorNewGameMessage(message : string) {
    this.errorNewGame = true;
    this.errorNewGameMessage = message;
  }

  disableErrorNewGameMessage() {
    this.errorNewGame = false;
    this.errorNewGameMessage = "";
  }

  setErrorJoinGameMessage(message : string) {
    this.errorJoinGame = true;
    this.errorJoinGameMessage = message;
  }

  disableErrorJoinGameMessage() {
    this.errorJoinGame = false;
    this.errorJoinGameMessage = "";
  }

  handleJoinError(error : HttpErrorResponse) {
    if(error.status == 404) {
      this.setErrorJoinGameMessage("This game id does not exists");
    } else if(error.status == 409) {
      this.setErrorJoinGameMessage("This player name is already used");
    } else {
      this.setErrorJoinGameMessage("There was an error while calling the server");
    }
  }

  handleCreateError(error : HttpErrorResponse) {
    if(error.status == 404) {
      this.setErrorNewGameMessage("This game id does not exists");
    } else {
      this.setErrorNewGameMessage("There was an error while calling the server");
    }
  }
}


