import {Channel, ChannelPayloadFilter} from 'spyne';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';
import {GameTraits} from 'traits/game-traits';

export class ChannelTicTacToe extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TIC_TAC_TOE";
    props.sendCachedPayload = true;
    props.traits = [TicTacToeTraits, GameTraits];
    props.stateMachine = GameTraits.game$CreateStateMachine();
    super(name, props);
  }


  sendCurrentState(action="CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT"){
    const {state} = this.props.stateMachine;
    this.sendChannelPayload(action, state);
  }

  sendUpdateBoardAction(type, num){
    this.props.stateMachine[`${type}`] = num;
    const action = `CHANNEL_TIC_TAC_TOE_${type.toUpperCase()}_CHANGE_EVENT`;
    this.sendCurrentState(action);
  }


  onBtnClicked(e){
    const {type, squareNum, moveNum} = e.payload;
    const num = type === 'square' ? squareNum : moveNum;
    this.sendUpdateBoardAction(type, num);
  }

  onRegistered(){


    this.getChannel("CHANNEL_UI",
        new ChannelPayloadFilter(
        {selector: ['.empty', '.move-btn']}))
        .subscribe(this.onBtnClicked.bind(this));

     this.sendCurrentState();


  }

  addRegisteredActions() {

    return [
      "CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT",
      "CHANNEL_TIC_TAC_TOE_MOVE_CHANGE_EVENT"
    ];
  }

}

