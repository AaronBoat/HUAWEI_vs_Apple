// src/index.ts

import { Player } from './Player';
import { Market } from './Market';
import { Card } from './Card';
import { Game } from './Game';
import { logMessage } from './utils';

// 初始化玩家
const player1 = new Player("玩家1", 20);
const player2 = new Player("玩家2", 20);

// 创建一些卡牌
const card1 = new Card("iPhone 14 Pro", 5, 4, true, false, false, false);
const card2 = new Card("Apple Watch", 3, 2);
const card3 = new Card("华为 Mate 50", 4, 5, false, true);
const card4 = new Card("华为 P50 Pro", 3, 3, true, false, false, true);

// 将卡牌加入玩家的手牌
player1.hand.push(card1);
player1.hand.push(card2);
player2.hand.push(card3);
player2.hand.push(card4);

// 初始化市场
const market1 = new Market("北美市场", 10);
const market2 = new Market("亚太市场", 8);

// 初始化游戏
const game = new Game([player1, player2], [market1, market2]);

// 启动游戏
logMessage("游戏开始！", 'info');
game.startGame();
