import'./scss/main.scss';
import {SpyneApp, ViewStream} from 'spyne';
import {TicTacToeGame} from 'components/tic-tac-toe-game';
import {ChannelTicTacToe} from 'channels/channel-tic-tac-toe';

const R = require('ramda');
window.R = R;

const config = {debug:true};

SpyneApp.init(config);
SpyneApp.registerChannel(new ChannelTicTacToe());

new TicTacToeGame();

