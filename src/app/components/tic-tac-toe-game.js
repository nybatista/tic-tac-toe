import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {GameTraits} from 'traits/game-traits';

export class TicTacToeGame extends ViewStream {

    constructor(props={}) {
        props.el = document.querySelector('.game');
        props.traits = [TicTacToeTraits, GameTraits];
        super(props);
    }

  addActionListeners() {
    return [
      ["CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT", "game$UpdateBoard"],
      ["CHANNEL_TIC_TAC_TOE_MOVE_CHANGE_EVENT", "game$UpdateBoard"]
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
      //this.ticTac$UpdateStatusText();
      //this.ticTac$CreateMoveItem();
    }

}

