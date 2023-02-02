import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game, Player } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private id = new Subject<string>();
  private game = new Subject<Game>();
  private gameReady = new BehaviorSubject<boolean>(false);
  private playerName = new Subject<string>();
  private player = new Subject<Player>();
  private gameState = new Subject<string>();
  private isLoaded = new BehaviorSubject<boolean>(false);

  constructor() { }

  loadGame(game: Game, playerName: string) {
    this.game.next(game);
    this.setPlayer(game, playerName);
    this.gameState.next(game.state);
    this.gameReady.next(game.state == 'ready');
    this.isLoaded.next(true);
  }

  setPlayer(game: Game, playerName: string) {
    for(let player of game.players) {
      if(player.name == playerName) {
        this.player.next(player);
      }
    }
  }

  setId(id: string) {
    this.id.next(id);
  }

  getId() {
    return this.id.asObservable();
  }

  setPlayerName(playerName: string) {
    this.playerName.next(playerName);
  }

  getPlayerName() {
    return this.playerName.asObservable();
  }

  getGame() {
    return this.game.asObservable();
  }

  getGameState() {
    return this.gameState.asObservable();
  }

  getIsLoaded() {
    return this.isLoaded.asObservable();
  }

  getPlayer() {
    return this.player.asObservable();
  }

  getGameReady() {
    return this.gameReady.asObservable();
  }
    
  
}
