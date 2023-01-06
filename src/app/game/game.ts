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
}

export class Board {
    score: number;
    grid: Card[][];
}