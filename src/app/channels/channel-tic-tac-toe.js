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

  sendUpdateBoardAction(type, num){
    this.props.stateMachine[`${type}Num`] = num;
    const {state} = this.props.stateMachine;
    const action = `CHANNEL_TIC_TAC_TOE_${type.toUpperCase()}_CLICK_EVENT`;
    this.sendChannelPayload(action, state);
  }

  onBtnClicked(e){
    const {type, squareNum, moveNum} = e.payload;
    const {target} = e.event;
    const isEmptySquare = type==='square' && target.innerText==='';
    if (isEmptySquare === true && this.props.stateMachine.state.isWinner !== true){
      this.sendUpdateBoardAction(type, squareNum);
    } else if (type === 'move'){
      this.sendUpdateBoardAction(type, moveNum);
    }

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

}

