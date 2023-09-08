import {ViewStream, channelPayloadFilter, ChannelPayloadFilter} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';

export class TicTacToeMoveBtn extends ViewStream {

    constructor(props={}) {
      props.traits = [TicTacToeTraits];
      props.tagName = 'li';
      props.template = `<button data-type='move' data-move-num=${props.moveNum}>${props.text}</button>`
      super(props);
    }

    addActionListeners() {
      return [
          ["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "disposeViewStream", this.ticTac$GetPayloadFilter('move')]
        ];
    }


    broadcastEvents() {
        // return nexted array(s)
        return [
            ['button' , 'click']
           ];
    }

    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");
    }

}

