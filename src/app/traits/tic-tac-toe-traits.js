import {SpyneTrait} from 'spyne';
import {TicTacToeSquare} from 'components/tic-tac-toe-square';
import {TicTacToeStatus} from 'components/tic-tac-toe-status';
import {TicTacToeMoveList} from 'components/tic-tac-toe-move-list';
import {compose, head, join, pickAll, last, values, mergeAll, test, slice} from 'ramda';


export class TicTacToeTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "ticTac$";

    super(context, traitPrefix);
  }

  static ticTac$HelloWorld(){
    return "Hello World";
  }

  static ticTac$UpdateSquare(e, props=this.props){
    const {state} = e.payload;
    this.props.el.innerText =  state[this.props.squareNum] || '';


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
     let _isWinner;
     let _winner;
     let _state = {};

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
        _moveNum = val;
      }
      get squareVal(){
        return _squareVal;
      }

      updateState(){
        _movesArr.push({[_currentSquareNum]: this.updateSquareVal()});
      }



      updateSquareVal(){
        const checkForX = val => ['O', undefined].includes(val) ? "X" : "O";
        _squareVal = compose(checkForX, head, values, last)(_movesArr);
        return _squareVal;
      }

      get movesArr(){
        return _movesArr;
      }

      get state(){
        _state = compose(mergeAll, slice(0, _moveNum))(_movesArr);
        return _state;
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
        const currentState = this.state;
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

