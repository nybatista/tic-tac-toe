import {ViewStream, ChannelPayloadFilter} from 'spyne';

export class TicTacToeMoveBtn extends ViewStream {

    constructor(props={}) {
      props.tagName = 'li';
      props.template = `<button data-type='move' data-num=${props.moveNum} data-move=${props.moveNum} data-move-num=${props.moveNum}


    >${props.text}</button>`
      super(props);
    }

    addActionListeners() {
      const payloadFilter = new ChannelPayloadFilter({
        payload: v => v.moveNum<=this.props.moveNum
      });
      return [["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "disposeViewStream", payloadFilter]];
    }


    broadcastEvents() {
        return [['button' , 'click']];
    }

    onRendered() {
      this.addChannel("CHANNEL_TIC_TAC_TOE");
    }

}

