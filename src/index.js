import {SpyneApp, ViewStream, ChannelPayloadFilter} from 'spyne';
import {GameViewTraits} from './app/game-view-traits';
import {TicTacToeChannel} from './app/tic-tac-toe-channel';
import {GameView} from './app/game-view';

const R = require('ramda');
window.R = R;

const config = {debug:true};

SpyneApp.init(config);
SpyneApp.registerChannel(new TicTacToeChannel());


class GameboardView extends ViewStream {

  constructor(props={}) {
    props.traits = [GameViewTraits];
    props.class = "game";
    props.template = GameViewTraits.game$GetGameboardTemplate();
    super(props);
  }

  /**
   * TODO: create a pre method for change add move btn
   *
   * */

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


new GameView().appendToDom(document.body);

//new GameboardView().appendToDom(document.body);


