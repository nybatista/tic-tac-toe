import'./scss/main.scss';
import {SpyneApp} from 'spyne';
import {AppView} from './app/app-view';
import {TicTacToeGame} from 'components/tic-tac-toe-game';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';




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
new TicTacToeGame();
