import'./scss/main.scss';
import {SpyneApp, ViewStream} from 'spyne';
import {AppView} from './app/app-view';
import {TicTacToeGame} from 'components/tic-tac-toe-game';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';
import {TicTacToeTraits} from 'traits/tic-tac-toe-traits';

const R = require('ramda');
window.R = R;


const config = {
  debug:true
};

SpyneApp.init(config);

SpyneApp.registerChannel(new ChannelTicTacToe());


if (process.env.NODE_ENV === 'development') {
  const {SpynePluginConsole} = require('spyne-plugin-console');
  new SpynePluginConsole({position: ['bottom', 'right'], minimize: true});
}

//new AppView().prependToDom(document.body);
//new TicTacToeGame();

const ticTacToeGame = new ViewStream({
  el:  document.querySelector('.game'),
  traits: [TicTacToeTraits]

})
ticTacToeGame.ticTac$InitBoard()

