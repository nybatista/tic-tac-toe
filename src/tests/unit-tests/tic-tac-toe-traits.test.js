const {expect, assert} = require('chai');
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

describe('should init tic-tac-toe traits tests', () => {

  it('should return tic-tac-toe traits as function', () => {
     expect(TicTacToeTraits).to.be.a('function');
  });

});



describe('should create tic tac toe state machine', ()=>{
  const stateMachine =  TicTacToeTraits.ticTac$CreateStateMachine();
  it('should return state machine object', ()=>{
    expect(stateMachine).to.be.a('object');
  });

  it('should return first X val',()=>{
    stateMachine.updateSquareVal();
    const {squareVal} = stateMachine;


    expect(squareVal).to.eq('X');
  })

  it('should update state when adding a square number', ()=>{
    const stateMachine =  TicTacToeTraits.ticTac$CreateStateMachine();

    stateMachine.currentSquareNum = 4;
    stateMachine.currentSquareNum = 2;
    stateMachine.currentSquareNum = 3;
    stateMachine.currentSquareNum = 6;
    stateMachine.currentSquareNum = 5;
    stateMachine.currentSquareNum = 4;
    //console.log('state machine ', stateMachine.state, ' -- ',stateMachine.movesArr);

    return true;


  })

  it('should update state when updating the move number', ()=>{
    const stateMachine = TicTacToeTraits.ticTac$CreateStateMachine([{2: 'O'}, {3: 'X'}, {6: 'O'}, {5: 'X'}, {4: 'O'}, {1:'X'}, {7:'O'},{8:'X'},{0:'O'}]);


    stateMachine.moveNum = 2;
    expect(stateMachine.state).to.deep.eq({2: 'O', 3: 'X'});
    //console.log('state machine before num', stateMachine.state, ' -- ',stateMachine.movesArr,' -- ',stateMachine.moveNum);


    stateMachine.moveNum = 4;
    expect(stateMachine.state).to.deep.eq({2: 'O', 3: 'X', 5: 'X', 6: 'O'});
    //console.log('state machine after num1', stateMachine.state, ' -- ',stateMachine.movesArr,' -- ',stateMachine.moveNum);

    stateMachine.currentSquareNum = 7;
    expect(stateMachine.state).to.deep.eq({2: 'O', 3: 'X', 5: 'X', 6: 'O', 7: 'O'});
    //console.log('state machine after num ', stateMachine.state, ' -- ',stateMachine.movesArr,' -- ',stateMachine.moveNum);




    return true;
  })

  it('should check for winner',()=>{

    const stateMachineRow1X = TicTacToeTraits.ticTac$CreateStateMachine([{3: 'O'}, {2: 'X'}, {6: 'O'}, {5: 'X'}, {4: 'O'}, {1:'X'}, {7:'O'},{0:'X'}]);
    expect(stateMachineRow1X.winner).to.eq('X');

    const stateMachineRowDiagO = TicTacToeTraits.ticTac$CreateStateMachine([{3: 'O'}, {2: 'O'}, {6: 'O'}, {5: 'X'}, {4: 'O'}, {1:'X'}, {7:'O'},{0:'X'}]);
    expect(stateMachineRowDiagO.winner).to.eq('O');


  })


});



describe('should test tic tac toe channel traits', ()=>{

  it('should test methods for channel', ()=>{
      //console.log('channel tests ');

      return true;
  });


});

describe('should test tic tac toe square traits', ()=>{

  it('should test methods for square', ()=>{
    //console.log('square tests ');

    return true;
  });


});

describe('should test tic tac toe move traits', ()=>{

  it('should test methods for move', ()=>{
    //console.log('move tests ');

    return true;
  });


});




describe('should test tic tac toe status traits', ()=>{

  it('should test methods for status', ()=>{
    //console.log('status tests ');

    return true;
  });


});
