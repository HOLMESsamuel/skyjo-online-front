import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit{

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recoverParamsFromUrl();
  }

  status: string;

  message: string;

  recoverParamsFromUrl() {
    this.status = this.route.snapshot.params['status'];
    this.setMessage(this.status);
  }

  returnHome() {
    window.location.href = '/';
  }

  //switch on status and set a different message accordingly
  setMessage(status : string) {
    switch (status) {
      case '404':
        this.message = "The game or player you are trying to reach does not exists, there can be a mistake in game ID or player name in the URL, if not, keep in mind that after 10 minutes of inactivity a game is automatically deleted."
        break;
      case '0':
      case '500':
        this.message = "The server is not responding, which means your game probably does not exist anymore, sorry for the inconvenience."
        break;
      default:
        this.message = "Some unknown error happened, sorry for the inconvenience, you need to start a new game."
        break;
    }
  }

}
