export class Game {
    id: string;
    state: string;
    players: Array<Player>;


}

export class Player {
    name: string;
    state: string;
    cardInHand: Card;
    board: Board;
    score: number;
}

export class Card {
    number: number;
    visible: boolean;
    isClicked: boolean;
}

export class Board {
    score: number;
    grid: Card[][];
}

export class Coordinates {
    rowCard1: number;
    lineCard1: number;
    rowCard2: number;
    lineCard2: number;
}