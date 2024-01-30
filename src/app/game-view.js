import {ChannelPayloadFilter, ViewStream} from 'spyne';
import {GameViewTraits} from './game-view-traits';

export class GameView extends ViewStream {

  constructor(props={}) {
    props.class = "game";
    props.traits = [GameViewTraits];
    props.template = GameViewTraits.game$GetGameboardTemplate();
    super(props);
  }

  addActionListeners() {
    return [
      ["CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT", "game$CreateMoveBtn"],
      ["CHANNEL_TIC_TAC_TOE_MOVE_CHANGE_EVENT", "game$UpdateGameSquares"]
    ];
  }

  broadcastEvents() {
    return [
        ['button.square', 'click']
    ];
  }

  onRendered() {
    this.props.squaresArr = this.props.el$(".square").arr;
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
    return [
        ['button' , 'click']
    ];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE", true);
  }

}
