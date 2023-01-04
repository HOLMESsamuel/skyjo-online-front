import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { GameRestService } from '../game-rest-service.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent {

  constructor(private gameService: GameRestService) {}

  errorNewGame : boolean = false;
  errorNewGameMessage : string = "";

  errorJoinGame : boolean = false;
  errorJoinGameMessage : string = "";

  launchGame(value : string) {
    if(value == null || value == "") {
      this.setErrorNewGameMessage("You need to enter a name to create a game")
    } else {
      this.gameService.createGame(value).subscribe({
        error: (err) => { this.handleCreateError(err) },
        next: (game : any) => { console.log(game.id) }
      });
      this.disableErrorNewGameMessage();
      console.log(value);
    }
  }

  joinGame(id : string, name : string) {
    if(id == null || id == "" || name == null || name == "") {
      this.setErrorJoinGameMessage("You need to enter your name and the game ID to join it")
    } else {
      this.gameService.joinGame(id, name).subscribe({
        error: (err) => { this.handleJoinError(err) },
        next: (game : any) => { console.log(game.id) }
      });
      this.disableErrorJoinGameMessage();
      console.log(name, id);
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
      this.setErrorJoinGameMessage("This game id does not exists");
    } else {
      this.setErrorJoinGameMessage("There was an error while calling the server");
    }
  }
}


