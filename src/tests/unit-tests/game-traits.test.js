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
     // expect(gameState.squares).to.deep.eq(['X', 'X', undefined, 'O', 'O', 'O', undefined, 'X']);

      gameState.move = 2;

      gameState.square = 1;
      gameState.square = 7;
      gameState.square = 2;


    })







  });

  describe('it should test game state', ()=>{
    const gameState = GameTraits.game$CreateStateMachine( [0,4,1,5,2])


    console.log("game state is ",gameState.state);


    describe('it should test game status text',()=>{
      const game = GameTraits.game$CreateStateMachine();

        it('it should return default status on zero moves', ()=>{
          const defaultState = game.state;
          expect(defaultState.squares).to.deep.eq([]);
          expect(defaultState.winner).to.eq(undefined);
          expect(defaultState.isWinner).to.be.false;
          //expect(defaultState.statusText).to.eq('Next player: X');
          //expect(defaultState.moveBtnText).to.eq('Go to game start');

          //console.log("new game is ",defaultState);
          return true;
        })

        it('it should return X on even moves',()=>{
          game.square=2;

          const xState = game.state;
          expect(xState.squares).to.deep.eq([undefined, undefined, 'X']);
          expect(xState.winner).to.eq(undefined);
          expect(xState.isWinner).to.be.false;
          //expect(xState.statusText).to.eq('Next player: O');
          //expect(xState.moveBtnText).to.eq('Go to move #1');

          //console.log("x game is ",xState);

          return true;

        })

        it('it should return O on odd moves',()=>{
          game.square=4;
          const oState = game.state;
          expect(oState.squares).to.deep.eq([undefined, undefined, 'X', undefined, 'O']);
          expect(oState.winner).to.eq(undefined);
          expect(oState.isWinner).to.be.false;
          //expect(oState.statusText).to.eq('Next player: X');
          //expect(oState.moveBtnText).to.eq('Go to move #2');

          //console.log("o game is ",oState);



        })

        it('it should return winner when winner param is defined ',()=>{
          game.square=0;
          game.square=5;
          game.square=1;


          const xWinner = game.state;
          expect(xWinner.squares).to.deep.eq(['X', 'X', 'X', undefined, 'O', 'O']);
          expect(xWinner.winner).to.eq('X');
          expect(xWinner.isWinner).to.be.true;
          //expect(xWinner.statusText).to.eq('Winner: X');
          //expect(xWinner.moveBtnText).to.eq('Go to move #5');

          console.log("xWinner ",xWinner);

        })

      it('it should return winner O by going back several moves ',()=>{

        game.move = 1;
        game.square = 1;
        game.square = 6;
        game.square = 7;
        game.square = 5;
        game.square = 4;


        const oWinner = game.state;
        expect(oWinner.squares).to.deep.eq([undefined, 'O', 'X', undefined, 'O', 'X', 'X', 'O']);
        expect(oWinner.winner).to.eq('O');
        expect(oWinner.isWinner).to.be.true;
        //expect(oWinner.statusText).to.eq('Winner: O');
        //expect(oWinner.moveBtnText).to.eq('Go to move #6');

        console.log("oWinner ",oWinner);

      })


      });






  });

});
