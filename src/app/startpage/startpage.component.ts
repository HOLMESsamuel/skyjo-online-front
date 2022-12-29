import { Component } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent {

  errorNewGame : boolean = false;
  errorNewGameMessage : string = "";

  errorJoinGame : boolean = false;
  errorJoinGameMessage : string = "";

  launchGame(value : string) {
    if(value == null || value == "") {
      this.setErrorNewGameMessage("You need to enter a name to create a game")
    } else {
      this.disableErrorNewGameMessage();
      console.log(value);
    }
  }

  joinGame(id : string, name : string) {
    if(id == null || id == "" || name == null || name == "") {
      this.setErrorJoinGameMessage("You need to enter your name and the game ID to join it")
    } else {
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
}


