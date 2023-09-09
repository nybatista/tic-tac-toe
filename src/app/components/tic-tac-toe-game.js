import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

export class TicTacToeGame extends ViewStream {

    constructor(props={}) {
        props.el = document.querySelector('.game');
        props.traits = [TicTacToeTraits];
        super(props);
    }

    onRendered() {
      this.ticTac$InitBoard();
    }

}

