import {SpyneApp, ViewStream, ChannelPayloadFilter} from 'spyne';
import {TicTacToeTraits} from './app/tic-tac-toe-traits';
import {TicTacToeChannel} from './app/tic-tac-toe-channel';

const R = require('ramda');
window.R = R;

const config = {debug:true};

SpyneApp.init(config);
SpyneApp.registerChannel(new TicTacToeChannel());


class GameboardView extends ViewStream {

  constructor(props={}) {
    props.traits = [TicTacToeTraits];
    props.class = "game";
    props.template = TicTacToeTraits.game$GetGameboardTemplate();
    super(props);
  }

  addActionListeners() {
    return [
      ["CHANNEL_TIC_TAC_TOE_.*_CHANGE_EVENT", "game$UpdateBoard"]
    ];
  }

  broadcastEvents() {
    return [['button.square', 'click']];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE");
  }

}


export class MoveBtn extends ViewStream {

  constructor(props={}) {
    props.tagName = 'li';
    super(props);
  }

  addActionListeners() {
    const payloadFilter = new ChannelPayloadFilter({
      payload: v => v.moveNum<=this.props.moveNum
    });
    return [["CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT", "disposeViewStream", payloadFilter]];
  }


  broadcastEvents() {
    return [['button' , 'click']];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE", true);
  }

}


new GameboardView().appendToDom(document.body);


