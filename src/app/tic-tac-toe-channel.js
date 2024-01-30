import {Channel, ChannelPayloadFilter} from 'spyne';
import {TicTacToeTraits} from './tic-tac-toe-traits';

export class TicTacToeChannel extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TIC_TAC_TOE";
    props.sendCachedPayload = true;
    props.traits = [TicTacToeTraits];
    props.stateMachine = TicTacToeTraits.ticTacToe$CreateStateMachine();
    super(name, props);
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

