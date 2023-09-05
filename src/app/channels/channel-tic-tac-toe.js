import {Subject} from 'rxjs';
import {Channel} from 'spyne';

export class ChannelTicTacToe extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TIC_TAC_TOE";
    props.sendCachedPayload = false;

    super(name, props);
  }

  onBtnClicked(e){
    const {type} = e.payload;
    console.log("btn clicked ",{type,e});


  }

  onRegistered(){
    this.getChannel("CHANNEL_UI")
        .subscribe(this.onBtnClicked.bind(this));
  }

  addRegisteredActions() {

    return [];
  }

  onViewStreamInfo(obj) {
    let data = obj.props();
  }

}

