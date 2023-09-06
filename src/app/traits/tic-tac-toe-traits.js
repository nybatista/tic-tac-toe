import {SpyneTrait} from 'spyne';
import {TicTacToeSquare} from 'components/tic-tac-toe-square';
import {TicTacToeStatus} from 'components/tic-tac-toe-status';
import {TicTacToeMoveList} from 'components/tic-tac-toe-move-list';
import {compose, head, join, pickAll, last, values, mergeAll} from 'ramda';


export class TicTacToeTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "ticTac$";

    super(context, traitPrefix);
  }

  static ticTac$HelloWorld(){
    return "Hello World";
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
     let _squareNum;
     let _squareVal;
     let _isWinner;
     let _winner;
     let _state = {};

     class TicTacToeStateMachine{

      constructor() {



      }

      get squareNum(){
        return _squareNum;
      }

      set squareNum(num){
        _squareNum = num;
        this.updateState();
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
        _movesArr.push({[_squareNum]: this.updateSquareVal()});
      }

      updateSquareVal(){
        const checkForX = val => ['O', undefined].includes(val) ? "X" : "O";
        _squareVal = compose(checkForX, head, values, last)(_movesArr);
        return _squareVal;
      }

      get state(){
        _state = mergeAll(_movesArr);
        return _state;
      }




      get isWinner(){

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

        let isWinner = false;
        let iter = 0;
        let arr, winnerMatchArr;
        while (isWinner!==true || iter<lines.length){
          arr = lines[iter];
          winnerMatchArr = compose(join(''),values, pickAll(arr))(_state)
          isWinner = testFoMatch(winnerMatchArr);
          _winner = winnerMatchArr[0];
          iter++;

        }




/*        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (_movesArr[a] && _movesArr[a] === _movesArr[b] && _movesArr[a] === _movesArr[c]) {
            return _movesArr[a];
          }
        }
        return null;*/
      }


      resetMovesArr(){
        _movesArr = [];
      }





    }

    return new TicTacToeStateMachine();



  }

}

