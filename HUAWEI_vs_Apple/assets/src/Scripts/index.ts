// src/index.ts

import { Player } from './Player';
import { Market } from './Market';
import { Card } from './Card';
import { Game } from './Game';
import { logMessage } from './utils';

// ��ʼ�����
const player1 = new Player("���1", 20);
const player2 = new Player("���2", 20);

// ����һЩ����
const card1 = new Card("iPhone 14 Pro", 5, 4, true, false, false, false);
const card2 = new Card("Apple Watch", 3, 2);
const card3 = new Card("��Ϊ Mate 50", 4, 5, false, true);
const card4 = new Card("��Ϊ P50 Pro", 3, 3, true, false, false, true);

// �����Ƽ�����ҵ�����
player1.hand.push(card1);
player1.hand.push(card2);
player2.hand.push(card3);
player2.hand.push(card4);

// ��ʼ���г�
const market1 = new Market("�����г�", 10);
const market2 = new Market("��̫�г�", 8);

// ��ʼ����Ϸ
const game = new Game([player1, player2], [market1, market2]);

// ������Ϸ
logMessage("��Ϸ��ʼ��", 'info');
game.startGame();
