import {SpyneApp} from 'spyne';
import {TicTacToeChannel} from './app/tic-tac-toe-channel';
import {GameView} from './app/game-view';

SpyneApp.init({debug:true});
SpyneApp.registerChannel(new TicTacToeChannel());


new GameView().appendToDom(document.body);



