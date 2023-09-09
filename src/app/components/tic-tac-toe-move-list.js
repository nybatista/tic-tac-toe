import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

export class TicTacToeMoveList extends ViewStream {

    constructor(props={}) {
        props.traits = [TicTacToeTraits];
        super(props);
    }

    addActionListeners() {
        return [["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "ticTac$CreateMoveItem"]];
    }

    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");
      this.ticTac$CreateMoveItem();
    }

}

