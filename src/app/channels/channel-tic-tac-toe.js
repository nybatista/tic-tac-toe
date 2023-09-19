import {Channel, ChannelPayloadFilter} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {GameTraits} from 'traits/game-traits';

export class ChannelTicTacToe extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TIC_TAC_TOE";
    props.sendCachedPayload = false;
    props.traits = [TicTacToeTraits, GameTraits];
    props.stateMachine = GameTraits.game$CreateStateMachine();

    super(name, props);
  }

  sendUpdateBoardAction(type, num){
    this.props.stateMachine[`${type}`] = num;
    const {state} = this.props.stateMachine;
    const action = `CHANNEL_TIC_TAC_TOE_${type.toUpperCase()}_CHANGE_EVENT`;
    this.sendChannelPayload(action, state);
  }

  onBtnClicked(e){
    const {type, squareNum, moveNum} = e.payload;
    const num = type === 'square' ? squareNum : moveNum;
    this.sendUpdateBoardAction(type, num);
  }

  onRegistered(){

    const payloadFilter = new ChannelPayloadFilter({
      payload: v => ['square', 'move'].includes(v.type),
      srcElement: e =>  e.el.innerText === '' && this.props.stateMachine.state.isWinner===false || e.el.dataset.moveNum !== undefined
    })

    this.getChannel("CHANNEL_UI", payloadFilter)
        .subscribe(this.onBtnClicked.bind(this));


    const onRoute = ()=>{
      const {state} = this.props.stateMachine;
      const action = `CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT`;
      console.log("SEND CHANNEL PAYLOAD ",{action, state})
      const onWait = ()=>this.sendChannelPayload(action, state);
      //onWait();
      //window.setTimeout(onWait, 500);
      requestAnimationFrame(onWait);

    }

    onRoute();

/*    const routePL = new ChannelPayloadFilter({
      action: "CHANNEL_ROUTE_DEEPLINK_EVENT"
    })



      this.getChannel("CHANNEL_ROUTE", routePL)
          .subscribe(onRoute);*/

  }

  addRegisteredActions() {

    return [
      "CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT",
      "CHANNEL_TIC_TAC_TOE_MOVE_CHANGE_EVENT"
    ];
  }

}

