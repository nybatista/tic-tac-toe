import {SpyneTrait, ViewStream, ChannelPayloadFilter} from 'spyne';
import {compose, defaultTo, head, join, keys, pickAll, last, values, mergeAll, test, slice} from 'ramda';
//import {TicTacToeSquare} from 'components/tic-tac-toe-square';
//import {TicTacToeStatus} from 'components/tic-tac-toe-status';
//import {TicTacToeMoveList} from 'components/tic-tac-toe-move-list';
//import {TicTacToeMoveBtn} from 'components/tic-tac-toe-move-btn';

class TicTacToeStatus extends ViewStream {

  constructor(props={}) {
    props.traits = [TicTacToeTraits];
    super(props);
  }

  addActionListeners() {
    return [["CHANNEL_TIC_TAC_TOE_.*_CLICK_EVENT", "ticTac$UpdateStatusText"]];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE");
    this.ticTac$UpdateStatusText();
  }

}


export class TicTacToeMoveList extends ViewStream {

  constructor(props={}) {
    props.traits = [TicTacToeTraits];
    super(props);
  }

  addActionListeners() {
    return [["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "ticTac$CreateMoveItem"]];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE");
    this.ticTac$CreateMoveItem();
  }

}


class TicTacToeSquare extends ViewStream {

  constructor(props={}) {
    props.traits = [TicTacToeTraits];
    props.squareNum = props.el.dataset.squareNum;
    super(props);
  }

  addActionListeners() {
    return [
      ["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "ticTac$UpdateSquare"],
      ["CHANNEL_TIC_TAC_TOE_MOVE_CLICK_EVENT", "ticTac$UpdateSquare"]
    ];
  }

  broadcastEvents() {
    return [['button', 'click']];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE");

  }

}

class TicTacToeMoveBtn extends ViewStream {

  constructor(props={}) {
    props.tagName = 'li';
    props.template = `<button data-type='move' data-move-num=${props.moveNum}>${props.text}</button>`
    super(props);
  }

  addActionListeners() {
    const payloadFilter = new ChannelPayloadFilter({
      payload: v => v.moveNum<=this.props.moveNum
    });
    return [["CHANNEL_TIC_TAC_TOE_SQUARE_CLICK_EVENT", "disposeViewStream", payloadFilter]];
  }


  broadcastEvents() {
    return [['button' , 'click']];
  }

  onRendered() {
    this.addChannel("CHANNEL_TIC_TAC_TOE");
  }

}

export class TicTacToeTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "ticTac$";
    super(context, traitPrefix);
  }

  static ticTac$UpdateSquare(e, props=this.props){
    const {squares} = e.payload;
    this.props.el.innerText =  squares[this.props.squareNum] || '';
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

     const getSquareVal = (n=0) => ["X","O"][n%2];
     let _movesArr = movesArr;
     let _moveNum;
     let _currentSquareNum;
     let _squareVal;
     let _nextSquareVal;
     let _winner;
     let _squares = {};

     class TicTacToeStateMachine{

      constructor() {

      }

       set squareNum(num){
         _currentSquareNum = parseInt(num);
         _movesArr = slice(0, _moveNum, _movesArr);
         this.updateState();
         _moveNum = _movesArr.length;
       }


      get moveNum(){
        return _moveNum;
      }

      set moveNum(val){
        _moveNum = parseInt(val);
        _nextSquareVal = getSquareVal(_moveNum);
      }

      updateSquareVals(num=_moveNum){
        const n = _moveNum || 0;
        _squareVal = getSquareVal(n);
        _nextSquareVal = getSquareVal(n+1);
      }

      updateState(){
        this.updateSquareVals();
        _movesArr.push({[_currentSquareNum]: _squareVal});
      }


      get state(){
        const obj = {
          squares:          this.squares,
          winner:           this.winner,
          isWinner:         this.winner !== undefined,
          nextSquareVal:    _nextSquareVal,
          currentSquareNum: _currentSquareNum,
          currentSquareVal: _squareVal,
          moveNum:          _moveNum
        };
       // console.log(obj, )
        return obj;
      }

       get squares(){
         _squares = compose(mergeAll, slice(0, _moveNum))(_movesArr);
         return _squares;
       }


      get winner(){
        return this.checkForWinner();
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
          [2, 4, 6]
        ];
        const testFoMatch = test(/^(X{3}|O{3})$/);

        let _isWinner = false;
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

        return _winner;
      }

    }

    return new TicTacToeStateMachine();

  }

}

