export class Game {
    id: string;
    state: string;
    players: Array<Player>;
    deck: DecodeErrorCallback;
    scoreBoard: Map<string, PlayerScore>;
    numberOfGames: number;
}

export class Player {
    name: string;
    state: string;
    cardInHand: Card;
    board: Board;
    score: number;
    playerTurn: boolean;
}

export class Card {
    number: number;
    visible: boolean;
    isClicked: boolean;
    eliminated: boolean;
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

export class Deck {
    removedCards: Card[];
}

export class Choice {
    choiceString: string;
    row: number;
    column: number;
}

export class PlayerScore {
    scores: number[];
    totalScore: number;
}