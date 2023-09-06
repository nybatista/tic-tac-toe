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
