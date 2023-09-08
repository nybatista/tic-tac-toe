import {SpyneTrait, ChannelPayloadFilter} from 'spyne';
import {TicTacToeSquare} from 'components/tic-tac-toe-square';
import {TicTacToeStatus} from 'components/tic-tac-toe-status';
import {TicTacToeMoveList} from 'components/tic-tac-toe-move-list';
import {compose, head, join, pickAll, last, values, mergeAll, test, slice} from 'ramda';
import {TicTacToeMoveBtn} from 'components/tic-tac-toe-move-btn';


export class TicTacToeTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "ticTac$";

    super(context, traitPrefix);
  }

  static ticTac$HelloWorld(){
    return "Hello World";
  }

  static ticTac$UpdateSquare(e, props=this.props){
    const {squares} = e.payload;
    this.props.el.innerText =  squares[this.props.squareNum] || '';


  }

  static ticTac$GetPayloadFilter(type='move', props=this.props){

    const payloadFiltersHash = {

      move: ()=>new ChannelPayloadFilter({
        payload: v => v.moveNum<=this.props.moveNum
      })

    }

    const fn = payloadFiltersHash[type];
    return fn();
  }

  static ticTac$GetMoveBtnText(num=0){
    return num === 0 ? "Go to game start" : `Go to move #${num}`;
  }

  static ticTac$CreateMoveItem(e={payload:{moveNum: 0}}){
    const {moveNum} = e.payload;
    const text = this.ticTac$GetMoveBtnText(moveNum);
    this.appendView(new TicTacToeMoveBtn( {text, moveNum}), "ol");

  }

  static ticTac$GetStatusText(state={isWinner:false, nextSquareVal:"X"}){
    return state.isWinner ? `Winner: ${state.currentSquareVal}` : `Next player: ${state.nextSquareVal}`;
  }

  static ticTac$UpdateStatusText(e={payload:{isWinner:false, nextSquareVal:"X"}}, props=this.props){
    this.props.el.innerText = this.ticTac$GetStatusText(e.payload);
  }

  static ticTac$InitBoard(props=this.props){
    new TicTacToeStatus({el:this.props.el$(".status").el});
    new TicTacToeMoveList({el:this.props.el$(".game-info").el});
    this.ticTac$InitSquares()
  }

  static ticTac$InitSquares(props=this.props){
    this.props.el$('.square').arr.forEach(el=>new TicTacToeSquare({el}))
  }

  static ticTac$CreateStateMachine(movesArr=[]){

     const _moveLimit = 9;
     let _movesArr = movesArr;
     let _moveNum;
     let _movesLen;
     let _currentSquareNum;
     let _squareVal;
     let _nextSquareVal;
     let _isWinner;
     let _winner;
     let _squares = {};

     class TicTacToeStateMachine{

      constructor() {



      }

      get currentSquareNum(){
        return _currentSquareNum;
      }

      set currentSquareNum(num){
        _currentSquareNum = parseInt(num);
        _movesArr = slice(0, _moveNum, _movesArr);
        this.updateState();
        _moveNum = _movesArr.length;
      }

      get moveNum(){
        return _moveNum;
      }

      set moveNum(val){
        console.log('old move num ',{_moveNum, _currentSquareNum, _squareVal, _nextSquareVal})
        _moveNum = parseInt(val);
        this.updateSquareVal(1);
        console.log('new move num ',{_moveNum, _currentSquareNum, _squareVal, _nextSquareVal})

      }
      get squareVal(){
        return _squareVal;
      }

      updateState(){
        _movesArr.push({[_currentSquareNum]: this.updateSquareVal()});
      }



      updateSquareVal(sliceAdj=0){
        const checkForX = val => ['O', undefined].includes(val) ? "X" : "O";
        _squareVal = compose(checkForX, head, values, last, slice(0,_moveNum-sliceAdj))(_movesArr);
        _nextSquareVal = _moveNum === 0 ? "X" : checkForX(_squareVal);
        return _squareVal;
      }

      get movesArr(){
        return _movesArr;
      }

      get state(){
        const obj = {
          squares:          this.squares,
          winner:           this.winner,
          isWinner:        this.winner !== undefined,
          currentSquareNum:  _currentSquareNum,
          currentSquareVal:        _squareVal,
          nextSquareVal:    _nextSquareVal,
          moveNum:          _moveNum
        };
        console.log("STATE: ",obj, JSON.stringify(_movesArr))
        return obj;
      }

       get squares(){
         _squares = compose(mergeAll, slice(0, _moveNum))(_movesArr);
         return _squares;
       }


      get winner(){
        this.checkForWinner();
        return _winner;
      }

      get isWinner(){
        return _isWinner;
      }

      checkForWinner(){
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        const testFoMatch = test(/^(X{3}|O{3})$/);

        _isWinner = false;
        let iter = 0;
        let arr, winnerMatchArr;
        const currentState = this.squares;
        while (iter<lines.length && _isWinner === false){
          arr = lines[iter];

          winnerMatchArr = compose(join(''),values, pickAll(arr))(currentState);
          _isWinner = testFoMatch(winnerMatchArr);
          _winner = _isWinner === true ? winnerMatchArr[0] : undefined;
          iter++;

        }


        return _isWinner;
      }


      resetMovesArr(){
        _movesArr = [];
      }





    }

    return new TicTacToeStateMachine();



  }

}

