import {Subject} from 'rxjs';
import {Channel} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

export class ChannelTicTacToe extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TIC_TAC_TOE";
    props.sendCachedPayload = false;
    props.traits = TicTacToeTraits;
    props.stateMachine = TicTacToeTraits.ticTac$CreateStateMachine();

    super(name, props);
  }

  onBtnClicked(e){
    const {type, squareNum, moveNum} = e.payload;
    const {target} = e.event;
    const isEmptySquare = type==='square' && target.innerText==='';
    console.log("TYPE IS ", {type,moveNum});
    if (isEmptySquare === true && this.props.stateMachine.state.isWinner !== true){
      this.props.stateMachine.currentSquareNum = squareNum;
      const {state} = this.props.stateMachine;
        this.sendChannelPayload("CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", state);


    } else if (type === 'move'){
        this.props.stateMachine.moveNum = moveNum;
        const {state} = this.props.stateMachine;
        this.sendChannelPayload("CHANNEL_TIC_TAC_TOE_MOVE_CLICK_EVENT", state);

    }

    //console.log("btn clicked ",{type,e,isEmptySquare,squareNum},  this.props.stateMachine.state,  this.props.stateMachine.winner);

  }

  onRegistered(){

    this.getChannel("CHANNEL_UI")
        .subscribe(this.onBtnClicked.bind(this));
  }

  addRegisteredActions() {

    return [
      "CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT",
      "CHANNEL_TIC_TAC_TOE_MOVE_CLICK_EVENT"

    ];
  }

  onViewStreamInfo(obj) {
    let data = obj.props();
  }

}

