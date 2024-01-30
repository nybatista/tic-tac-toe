import {ChannelPayloadFilter, ViewStream} from 'spyne';
import {GameViewTraits} from './game-view-traits';

export class GameView extends ViewStream {

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
      ["CHANNEL_TIC_TAC_TOE_MOVE_CHANGE_EVENT", "game$UpdateBoard"],
      ["CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT", "addMoveNumBtn"]
    ];
  }

  addMoveNumBtn(e){
    const {moveNum} = e.payload;

    const template = this.game$GetMoveNumBtnTemplate(moveNum);
    this.appendView(new MoveBtn({moveNum, template}), "ol");
    this.game$UpdateBoard(e);
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
