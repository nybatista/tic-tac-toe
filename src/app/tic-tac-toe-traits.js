import {SpyneTrait} from 'spyne';

export class TicTacToeTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "ticTacToe$";
    super(context, traitPrefix);
  }

  static ticTacToe$CreateStateMachine(movesArr=[]){
    let _movesArr = movesArr;
    let _lastMove = movesArr.length;
    const xoFn = (n=0) => n % 2 === 0 ? "X" : "O";

    class GameState{

      set square(n=0){
        _movesArr.splice(_lastMove, _movesArr.length, n);
        _lastMove = _movesArr.length;
      }

      set move(n=0){
        _lastMove = parseInt(n);
      }

      get squares(){
        const reduceToXO =  (acc, val, i)=>{
          acc[val] = xoFn(i);
          return acc;
        };
        return _movesArr.toSpliced(_lastMove, _movesArr.length).reduce(reduceToXO, []);
      }

      get state(){
        const {squares} = this;
        const moveNum = _lastMove;
        const winner = this.calculateWinner();
        const isWinner = winner !== undefined;
        const nextSquareVal = xoFn(_lastMove);
        return {squares, winner, isWinner, moveNum, nextSquareVal};
      }

      calculateWinner(xoArr=this.squares){

        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        const getXOMatch = arr => arr.map(val =>xoArr[val]).join('');

        const reducer = (acc, item)=>{
          acc = acc === undefined && /^(X{3}|O{3})$/.test(getXOMatch(item)) ? getXOMatch(item)[0] : acc;
          return acc;
        };
        return lines.reduce(reducer, undefined);;
      }
    }

    return new GameState();

  }

  static ticTacToe$SendGameState(action="CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT"){
    const {state} = this.props.stateMachine;
    this.sendChannelPayload(action, state);
  }

  static ticTacToe$UpdateGameState(e){
    const {type, squareNum, moveNum} = e.payload;
    this.props.stateMachine[`${type}`] = type === 'square' ? squareNum : moveNum;
    const action = `CHANNEL_TIC_TAC_TOE_${type.toUpperCase()}_CHANGE_EVENT`;
    this.ticTacToe$SendGameState(action);
  }




}

