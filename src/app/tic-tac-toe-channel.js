import {Channel, ChannelPayloadFilter} from 'spyne';
import {GameViewTraits} from './game-view-traits';
import {TicTacToeTraits} from './tic-tac-toe-traits';

export class TicTacToeChannel extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TIC_TAC_TOE";
    props.sendCachedPayload = true;
    props.traits = [GameViewTraits, TicTacToeTraits];
    props.stateMachine = TicTacToeTraits.ticTacToe$CreateStateMachine();
    super(name, props);
  }

  sendCurrentState(action="CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT"){
    const {state} = this.props.stateMachine;
    this.sendChannelPayload(action, state);
  }



  onBtnClicked(e){
    const updateBoard = (type, num)=>{
      this.props.stateMachine[`${type}`] = num;
      const action = `CHANNEL_TIC_TAC_TOE_${type.toUpperCase()}_CHANGE_EVENT`;
      this.sendCurrentState(action);

    }

    const {type, squareNum, moveNum} = e.payload;
    const num = type === 'square' ? squareNum : moveNum;
    updateBoard(type, num);
  }

  onRegistered(){

    this.getChannel("CHANNEL_UI", new ChannelPayloadFilter({selector: ['.empty', '.move-btn']}))
    .subscribe(this.ticTacToe$UpdateGameState.bind(this));

     this.ticTacToe$SendGameState();

  }

  addRegisteredActions() {

    return [
      "CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT",
      "CHANNEL_TIC_TAC_TOE_MOVE_CHANGE_EVENT"
    ];
  }

}

