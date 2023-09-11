const {expect, assert} = require('chai');
import {GameTraits} from 'traits/game-traits';

describe('should test game traits', () => {

  it('game traits should exist', () => {
   expect(GameTraits).to.be.a('function');
  });


  describe('it should test game state machine',()=>{

    it('should create state machine', ()=>{
       const gameState = GameTraits.game$CreateStateMachine();
      expect(gameState).to.be.a('object');

    })

    it('should return correct squares arr by adding squares',()=>{
      const gameState = GameTraits.game$CreateStateMachine( ['0', '3', '1', '5'])
      gameState.square = 7;
      gameState.square = 4;
      expect(gameState.squares).to.deep.eq(['X', 'X', undefined, 'O', 'O', 'O', undefined, 'X']);

      //gameState.move = 2;

      console.log("game state is ",gameState.squares);

    })



  })


});
