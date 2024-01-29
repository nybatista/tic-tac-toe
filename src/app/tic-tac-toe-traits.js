import {ChannelPayloadFilter, SpyneTrait, ViewStream} from 'spyne';
import {MoveBtn} from "../index";


export class TicTacToeTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "game$";
    super(context, traitPrefix);
  }


  static game$CreateMoveBtn(moveNum){
    const createMoveBtnTemplate = ()=>{
      const moveBtnText =  moveNum === 0 ? "Go to game start" : `Go to move #${moveNum}`;
      return `<button class="move-btn" data-type='move' data-num=${moveNum} data-move=${moveNum} data-move-num=${moveNum}>${moveBtnText}</button>`
    }

    const template = createMoveBtnTemplate();
    this.appendView(new MoveBtn({moveNum, template}), "ol");

  }

  static game$GetGameboardTemplate(){
    return `
        <div class="game-board">
            <div class="status">status</div>
            <div class="board-row">
                <button class="square square-0" data-type="square" data-square-num=0></button>
                <button class="square square-1" data-type="square" data-square-num=1></button>
                <button class="square square-2" data-type="square" data-square-num=2></button>
            </div>
            <div class="board-row">
                <button class="square square-3" data-type="square" data-square-num=3></button>
                <button class="square square-4" data-type="square" data-square-num=4></button>
                <button class="square square-5" data-type="square" data-square-num=5></button>
            </div>
            <div class="board-row">
                <button class="square square-6" data-type="square" data-square-num=6></button>
                <button class="square square-7" data-type="square" data-square-num=7></button>
                <button class="square square-8" data-type="square" data-square-num=8></button>
            </div>
        </div>
        <div class="game-info"><ol></ol>
        </div>
        `

  }


  static game$UpdateBoard(e, props=this.props){
    const {action, payload} = e;
    const {squares, winner,moveNum, isWinner, nextSquareVal} = payload;
    this.props.el$('.status').el.innerText =  isWinner ? `Winner: ${winner}` : `Next player: ${nextSquareVal}`;

    /**
     * TODO: CREATE MOVE FLAG based on btnType click payload
     * */
    if (action === "CHANNEL_TIC_TAC_TOE_SQUARE_CHANGE_EVENT") {
      this.game$CreateMoveBtn(moveNum);
    }

    const updateSquare = (el)=>{
      const {squareNum} = el.dataset;
      el.innerText = squares[squareNum] || '';
      el.classList.toggle('empty', squares[squareNum] === undefined && isWinner === false);
    }

    this.props.el$('.square').arr.forEach(updateSquare);
  }









  static game$CreateStateMachine(movesArr=[]){
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
}
