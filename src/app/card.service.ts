import { Injectable } from '@angular/core';
import { Card } from './game/game';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  cardColor(card: Card) {
    if(!card.visible) {
      return 'is-primary';
    } else {
      if(card.number < 0) {
        return 'is-purple';
      } else if (card.number == 0) {
        return 'is-blue';
      } else if (card.number < 5) {
        return 'is-green';
      } else if (card.number < 9){
        return 'is-yellow';
      } else {
        return 'is-red';
      }
    }
  }
}
