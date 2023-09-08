import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';

export class TicTacToeGame extends ViewStream {

    constructor(props={}) {
        props.el = document.querySelector('.game');
        props.traits = [TicTacToeTraits];
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [];
    }

    onRendered() {
      console.log("tic tac toe board rendered");
      this.ticTac$InitBoard();
      this.addChannel("CHANNEL_TIC_TAC_TOE");
    }

}

