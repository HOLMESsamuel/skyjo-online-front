import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game, Coordinates } from './game/game';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {

  constructor(private http: HttpClient) { }

  baseURL : string = "http://localhost:8080/games/";

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };
  
  createGame(playerName: string) {
    let url = this.baseURL;
    return this.http.post<Game>(url, playerName, this.httpOptions);
  }

  joinGame(gameId: string, playerName: string) {
    let url = this.baseURL + "join/" + gameId;
    return this.http.put<Game>(url, playerName, this.httpOptions);
  }

  getGame(gameId: string) {
    let url = this.baseURL + gameId;
    return this.http.get<Game>(url, this.httpOptions);
  }

  playerReady(gameId: string, playerName: string, coordinates: Coordinates) {
    let url = this.baseURL + gameId + "/" + playerName + "/ready";
    return this.http.put<Game>(url, coordinates, this.httpOptions);
  }

  startGame(gameId: string) {
    let url = this.baseURL + gameId + "/ready";
    return this.http.get<Game>(url, this.httpOptions);
  }

}
