import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {

  constructor(private http: HttpClient) { }

  baseURL : string = "http://localhost:8080/games";

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };
  
  createGame(playerName: string) {
    let url = this.baseURL;
    return this.http.post(url, playerName, this.httpOptions);
  }

  joinGame(gameId: string, playerName: string) {
    let url = this.baseURL + "/join/" + gameId;
    return this.http.put(url, playerName, this.httpOptions);
  }

}
