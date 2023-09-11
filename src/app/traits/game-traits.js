import {SpyneTrait, ViewStream, ChannelPayloadFilter} from 'spyne';
import {compose, defaultTo, head, join, keys, pickAll, last, values, mergeAll, test, reduce,reduced, slice} from 'ramda';
import {TicTacToeMoveBtn} from 'components/tic-tac-toe-move-btn';



export class GameTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "game$";

    super(context, traitPrefix);
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
        console.log("moves arr ",{_movesArr,n});

      }

      set move(n=0){
        _lastMove = parseInt(n);
        console.log('last move is ',_lastMove);
      }

      get squares(){
        const reduceToXO =  (acc, val, i)=>{
          acc[val] = xoFn(i); return acc
        };

        const squaresArr = _movesArr.toSpliced(_lastMove, _movesArr.length);

        console.log('squares arr is ',{_lastMove, squaresArr, _movesArr})
        return squaresArr.reduce(reduceToXO, []);
      }


      get state(){

      }

      calculateWinner(){
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
        const winner = lines.reduce(reducer, undefined);

        console.log("winner is ",winner);

      }

    }

    return new GameState();

  }

}

