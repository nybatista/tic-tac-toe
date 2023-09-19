import {SpyneTrait, ViewStream, ChannelPayloadFilter} from 'spyne';
import {compose, defaultTo, head, join, keys, pickAll, last, values, mergeAll, test, reduce,reduced, slice} from 'ramda';
import {TicTacToeMoveBtn} from 'components/tic-tac-toe-move-btn';



export class GameTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "game$";
    super(context, traitPrefix);
  }

  static game$UpdateBoard(e, props=this.props){

    const {action, payload} = e;
    const {squares, winner,moveNum, isWinner, nextSquareVal, statusText, moveBtnText} = payload;
    this.props.el$('.status').el.innerText = statusText;

    if (action === "CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT") {
      this.appendView(new TicTacToeMoveBtn({moveBtnText, moveNum}), "ol");
    }
    const updateSquare = (el)=>{
      const {squareNum} = el.dataset;
      el.innerText = squares[squareNum] || '';
      el.classList.toggle('empty', squares[squareNum] === undefined && isWinner === false);
      console.log('squares ',el,{squares, squareNum}, squares[squareNum])

    }
    this.props.el$('.square').arr.forEach(updateSquare);
    console.log("STATE VALS ",{e, squares, winner,moveNum, isWinner, nextSquareVal, statusText, moveBtnText})

  }


  static game$CreateStateMachine(movesArr=[]){

    let _movesArr = movesArr;
    let _lastMove = movesArr.length;
    const xoFn = (n=0) => n % 2 === 0 ? "X" : "O";

    class GameState{


      constructor() {

      }

      set square(n=0){
          _movesArr.splice(_lastMove, _movesArr.length, n);
          _lastMove = _movesArr.length;

      }

      set move(n=0){
        _lastMove = parseInt(n);
      }

      get squares(){
        const reduceToXO =  (acc, val, i)=>{
          acc[val] = xoFn(i); return acc
        };

        return _movesArr.toSpliced(_lastMove, _movesArr.length).reduce(reduceToXO, []);

      }


      get state(){
         const {squares} = this;
         const moveNum = _lastMove;
         const winner = this.calculateWinner();
         const isWinner = winner !== undefined;
         const nextSquareVal = xoFn(_lastMove);
         const statusText = isWinner ? `Winner: ${winner}` : `Next player: ${nextSquareVal}`;
         const moveBtnText =  moveNum === 0 ? "Go to game start" : `Go to move #${moveNum}`;
        return {squares, winner, isWinner,moveNum, nextSquareVal, statusText, moveBtnText};
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

        const getXOMatch = arr => arr.map(val =>xoArr[val]).join('')
        const reducer = (acc, item)=>{
          acc = acc === undefined && /^(X{3}|O{3})$/.test(getXOMatch(item)) ? getXOMatch(item)[0] : acc;
          return acc;
        };
        return lines.reduce(reducer, undefined);;

      }

    }

    return new GameState();

  }

}

