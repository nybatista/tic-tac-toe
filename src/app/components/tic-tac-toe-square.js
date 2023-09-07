import {ViewStream} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';

export class TicTacToeSquare extends ViewStream {

    constructor(props={}) {
        props.traits = [TicTacToeTraits];
        props.squareNum = props.el.dataset.squareNum;
        super(props);
    }

    addActionListeners() {
        return [
            ["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "ticTac$UpdateSquare"]
        ];
    }

    broadcastEvents() {
        return [
            ['button', 'click']
        ];
    }

    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");

    }

}

