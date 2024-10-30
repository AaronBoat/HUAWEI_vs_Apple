// src/Game.ts

import { Player } from './Player';
import { Market } from './Market';
import { Card } from './Card';

export class Game {
    players: Player[];             // �������
    markets: Market[];             // �г�����
    currentPlayerIndex: number;    // ��ǰ�������

    constructor(players: Player[], markets: Market[]) {
        this.players = players;
        this.markets = markets;
        this.currentPlayerIndex = 0; // ��ʼ��Ϊ��һ�����
    }

    // �л�����һ�����
    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        console.log(`�����ֵ� ${this.players[this.currentPlayerIndex].name} �Ļغ�`);
    }

    // ��ǰ��ҽ��й�������
    attackMarket(player: Player, market: Market, cardIndex: number) {
        const card = player.market[cardIndex];

        if (market.isConquered()) {
            console.log(`${market.name} �Ѿ���ռ�죬�޷��ٹ���`);
            return;
        }

        // ����г��п������ҿ����߲��ǵ�ǰ��ң����������ߵĿ���
        const marketOwner = market.owner;
        if (marketOwner && marketOwner !== player) {
            const tauntCards = marketOwner.market.filter(c => c.hasTaunt);
            let targetCard: Card | null = null;

            if (tauntCards.length > 0) {
                // ����г�������������ȹ�������
                targetCard = tauntCards[0];
            } else {
                // ���򹥻��Է���һ�������
                targetCard = marketOwner.market[Math.floor(Math.random() * marketOwner.market.length)];
            }

            if (targetCard) {
                targetCard.reduceUserRetention(card.marketAttraction);
                console.log(`${player.name} �� ${card.name} ������ ${marketOwner.name} �� ${targetCard.name}`);
                targetCard.updateCardStatus();

                // ��鿨���Ƿ��ƻ�
                marketOwner.removeDestroyedCards();
            }
        } else {
            // ����г�û�п����߻��߿������ǵ�ǰ��ң�ֱ�������г��ڴ�ֵ
            market.reduceExpectation(card.marketAttraction);
            console.log(`${player.name} �� ${card.name} �������г� ${market.name}�������� ${card.marketAttraction} ���ڴ�ֵ`);
        }

        // ����г��Ƿ�ռ��
        if (market.isConquered()) {
            market.changeOwner(player);
        }
    }

    // ִ����ҵ�һ���غ�
    playTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const currentMarket = this.markets[0]; // ��Ϊֻ����һ���г�

        console.log(`�ֵ� ${currentPlayer.name} �Ļغ�`);

        // ʾ��������������п��ƣ������һ�ſ���
        if (currentPlayer.hand.length > 0) {
            currentPlayer.playCard(0);
        }

        // ִ��һ���г�����������г����п��ƣ�
        if (currentPlayer.market.length > 0) {
            this.attackMarket(currentPlayer, currentMarket, 0);
        }

        // �л�����һ�����
        this.switchPlayer();
    }

    // �����Ϸ�Ƿ����
    checkGameEnd(): boolean {
        // ��������г��Ƿ��ѱ�ռ��
        const allMarketsConquered = this.markets.every(market => market.isConquered());
        if (allMarketsConquered) {
            console.log("�����г��ѱ�ռ�죬��Ϸ������");
            return true;
        }

        // ����Ƿ�����ұ�����
        const defeatedPlayers = this.players.filter(player => player.isDefeated());
        if (defeatedPlayers.length > 0) {
            defeatedPlayers.forEach(player => console.log(`${player.name} ��������`));
            console.log("��Ϸ������");
            return true;
        }

        return false;
    }

    // ������Ϸ
    startGame() {
        while (true) {
            this.playTurn();

            // �����Ϸ�Ƿ����
            if (this.checkGameEnd()) {
                break;
            }
        }
    }
}
