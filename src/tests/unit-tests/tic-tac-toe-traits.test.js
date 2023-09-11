const {expect, assert} = require('chai');
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

describe('should init tic-tac-toe traits tests', () => {

  it('should return tic-tac-toe traits as function', () => {
     expect(TicTacToeTraits).to.be.a('function');
  });

});



describe('should create game state class and methods',()=>{


    it('should initialize the game state machine',()=>{

        const gameState =  TicTacToeTraits.ticTac$CreateGameState()

      expect(gameState).to.be.a('object')
    })

    it('should return game state',()=>{
      const gameState =  TicTacToeTraits.ticTac$CreateGameState([0,2,3,4])


      console.log('state is ',gameState.state);
    })




})



describe('should create tic tac toe state machine', ()=>{
  const stateMachine =  TicTacToeTraits.ticTac$CreateStateMachine();
  it('should return state machine object', ()=>{
    expect(stateMachine).to.be.a('object');
  });

  it('should return first X val',()=>{
    stateMachine.updateSquareVals(0);
    const {currentSquareVal} = stateMachine.state;


    expect(currentSquareVal).to.eq('X');
  })

  it('should update state when adding a square number', ()=>{
    const stateMachine =  TicTacToeTraits.ticTac$CreateStateMachine();

    stateMachine.currentSquareNum = 4;
    stateMachine.currentSquareNum = 2;
    stateMachine.currentSquareNum = 3;
    stateMachine.currentSquareNum = 6;
    stateMachine.currentSquareNum = 5;
    stateMachine.currentSquareNum = 4;
    //console.log('state machine ', stateMachine.squares, ' -- ',stateMachine.movesArr);

    return true;


  })

  it('should update state when updating the move number', ()=>{
    const stateMachine = TicTacToeTraits.ticTac$CreateStateMachine([{3: 'X'}, {6: 'O'}, {5: 'X'}, {4: 'O'}, {1:'X'}, {7:'O'},{8:'X'},{0:'O'},{2: 'X'}]);


    stateMachine.moveNum = 2;
    expect(stateMachine.squares).to.deep.eq({3: 'X', 6: 'O'});
    //console.log('state machine before num', stateMachine.squares, ' -- ',stateMachine.movesArr,' -- ',stateMachine.moveNum);


    stateMachine.moveNum = 4;
    //console.log('state machine after num1', stateMachine.squares, ' -- ',stateMachine.movesArr,' -- ',stateMachine.moveNum);

    expect(stateMachine.squares).to.deep.eq({3: 'X', 4: 'O', 5: 'X', 6: 'O'});

    stateMachine.squareNum = 7;
    expect(stateMachine.squares).to.deep.eq({3: 'X', 4: 'O', 5: 'X', 6: 'O', 7: 'X'});
    //console.log('state machine after num ', stateMachine.squares, ' -- ',stateMachine.movesArr,' -- ',stateMachine.moveNum);




    return true;
  })

  it('should check for winner',()=>{

    const stateMachineRow1X = TicTacToeTraits.ticTac$CreateStateMachine([{3: 'O'}, {2: 'X'}, {6: 'O'}, {5: 'X'}, {4: 'O'}, {1:'X'}, {7:'O'},{0:'X'}]);
    stateMachineRow1X.currentSquareNum = 8;

    //console.log("state machien state ",stateMachineRow1X.state);
    expect(stateMachineRow1X.winner).to.eq('X');

    const stateMachineRowDiagO = TicTacToeTraits.ticTac$CreateStateMachine([{3: 'O'}, {2: 'O'}, {6: 'O'}, {5: 'X'}, {4: 'O'}, {1:'X'}, {7:'O'},{0:'X'}]);
    expect(stateMachineRowDiagO.winner).to.eq('O');

    //const stateMachineRowDiagX = TicTacToeTraits.ticTac$CreateStateMachine([{0: 'X'}, {1: 'O'}, {4: 'X'}]);
    //console.log('state machien winner ',stateMachineRowDiagX.winner)

  })


});



describe('should test tic tac toe channel traits', ()=>{

  it('should test methods for channel', ()=>{
      //console.log('channel tests ');

      return true;
  });


});

describe('should test tic tac toe square traits', ()=>{

  it('should get square number by move number', ()=>{
    const stateMachine = TicTacToeTraits.ticTac$CreateStateMachine([{"0":"X"},{"4":"O"},{"1":"X"},{"2":"O"},{"5":"X"},{"3":"O"},{"6":"X"},{"8":"O"}]);
    const state1 = stateMachine.state;
    //console.log('state1 ',stateMachine.getCurrentSquareNumByMoveNum());
    stateMachine.moveNum = 2;
    //console.log('state2 ',stateMachine.getCurrentSquareNumByMoveNum());
    stateMachine.currentSquareNum = 6;
    //console.log('state3 ',stateMachine.getCurrentSquareNumByMoveNum(),stateMachine.state);

    return true;
  });


});

describe('should test tic tac toe move traits', ()=>{

  it('should create default text for move button', ()=>{
    const defaultBtnTxt = TicTacToeTraits.ticTac$GetMoveBtnText();

    //console.log("dfaeult btn txt ",defaultBtnTxt);

    return true;
  });


});




describe('should test tic tac toe status traits', ()=>{

  it('should create default init text', ()=>{
    const defaultStatusTxt = TicTacToeTraits.ticTac$GetStatusText();
    expect(defaultStatusTxt).to.eq("Next player: X");
  });

  it('should create correct next players ',()=>{
    const nextPlayerO = TicTacToeTraits.ticTac$GetStatusText({isWinner:false, nextSquareVal:"O"});
    expect(nextPlayerO).to.eq("Next player: O");

  })
  it('should create correct winnners ',()=>{
    const winnerO = TicTacToeTraits.ticTac$GetStatusText({isWinner:true, currentSquareVal:"O"});
    const winnerX = TicTacToeTraits.ticTac$GetStatusText({isWinner:true, currentSquareVal:"X"});

    expect(winnerO).to.eq("Winner: O");
    expect(winnerX).to.eq("Winner: X");
  })


});
