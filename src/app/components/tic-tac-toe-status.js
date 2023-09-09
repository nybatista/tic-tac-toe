import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

export class TicTacToeStatus extends ViewStream {

    constructor(props={}) {
      props.traits = [TicTacToeTraits];
      super(props);
    }

    addActionListeners() {
        return [["CHANNEL_TIC_TAC_TOE_.*_CLICK_EVENT", "ticTac$UpdateStatusText"]];
    }

    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");
      this.ticTac$UpdateStatusText();
    }

}

