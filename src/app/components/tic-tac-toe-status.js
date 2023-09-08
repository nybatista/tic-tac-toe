import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';

export class TicTacToeStatus extends ViewStream {

    constructor(props={}) {
      props.traits = [TicTacToeTraits];
      super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [
          ["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "ticTac$UpdateStatusText"]

        ];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [];
    }

    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");
      this.ticTac$UpdateStatusText();
      //this.props.el.innerText = this.ticTac$GetStatusText();
    }

}

