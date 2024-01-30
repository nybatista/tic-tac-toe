import {ChannelPayloadFilter, SpyneTrait, ViewStream} from 'spyne';
import {MoveBtn} from './game-view';

export class GameViewTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "game$";
    super(context, traitPrefix);
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
    const {squares, winner, isWinner, nextSquareVal} = e.payload;
    this.props.el$('.status').el.innerText =  isWinner ? `Winner: ${winner}` : `Next player: ${nextSquareVal}`;

    const updateSquare = (el)=>{
      const {squareNum} = el.dataset;
      el.innerText = squares[squareNum] || '';
      el.classList.toggle('empty', squares[squareNum] === undefined && isWinner === false);
    }

    props.el$('.square').arr.forEach(updateSquare);
  }

  static game$GetMoveNumBtnTemplate(moveNum){
    const moveBtnText =  moveNum === 0 ? "Go to game start" : `Go to move #${moveNum}`;
    return `<button class="move-btn" data-type='move' data-num=${moveNum} data-move=${moveNum} data-move-num=${moveNum}>${moveBtnText}</button>`

  }

  static game$CreateMoveBtn(e){
    const {moveNum} = e.payload;
    const template = this.game$GetMoveNumBtnTemplate(moveNum);
    this.appendView(new MoveBtn({moveNum, template}), "ol");
    this.game$UpdateBoard(e);

  }


}
