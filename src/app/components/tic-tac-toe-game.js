import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

export class TicTacToeGame extends ViewStream {

    constructor(props={}) {
        props.el = document.querySelector('.game');
        props.traits = [TicTacToeTraits];
        super(props);
    }

  addActionListeners() {
    return [
      ["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "ticTac$UpdateAllSquares"],
      ["CHANNEL_TIC_TAC_TOE_MOVE_CLICK_EVENT", "ticTac$UpdateAllSquares"]
    ];
  }

  onUpdateGameBySquare(e){


  }
  onUpdateGameByMove(e){


  }

  broadcastEvents() {
    return [['button.square', 'click']];
  }


    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");
      this.ticTac$UpdateStatusText();
      this.ticTac$CreateMoveItem();
    }

}

