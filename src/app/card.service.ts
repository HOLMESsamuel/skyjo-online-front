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
        return 'is-link';
      } else if (card.number == 0) {
        return 'is-info';
      } else if (card.number < 5) {
        return 'is-success';
      } else if (card.number < 9){
        return 'is-warning';
      } else {
        return 'is-danger';
      }
    }
  }
}
