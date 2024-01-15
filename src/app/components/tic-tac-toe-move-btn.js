import {ViewStream, ChannelPayloadFilter} from 'spyne';

export class TicTacToeMoveBtn extends ViewStream {

    constructor(props={}) {
      props.tagName = 'li';
      props.moveBtnText =  props.moveNum === 0 ? "Go to game start" : `Go to move #${props.moveNum}`;
      props.template = `<button class="move-btn" data-type='move' data-num=${props.moveNum} data-move=${props.moveNum} data-move-num=${props.moveNum}>${props.moveBtnText}</button>`
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

