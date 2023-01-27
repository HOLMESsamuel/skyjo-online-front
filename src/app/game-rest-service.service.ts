import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game, Coordinates, Choice } from './game/game';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {

  constructor(private http: HttpClient) { }

  baseURL : string = environment.baseUrl;

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

  chooseCard(gameId: string, playerName: string, choice: Choice) {
    let url = this.baseURL + gameId + "/" + playerName + "/hand";
    return this.http.put<Game>(url, choice, this.httpOptions);
  }

  playCard(gameId: string, playerName: string, choice: Choice) {
    let url = this.baseURL + gameId + "/" + playerName + "/board";
    return this.http.put<Game>(url, choice, this.httpOptions);
  }

  deleteGame(gameId: string) {
    let url = this.baseURL + gameId;
    return this.http.delete<Game>(url, this.httpOptions);
  }

  resetGame(gameId: string) {
    let url = this.baseURL + gameId + "/new-game";
    return this.http.put<Game>(url, this.httpOptions);
  }

}
