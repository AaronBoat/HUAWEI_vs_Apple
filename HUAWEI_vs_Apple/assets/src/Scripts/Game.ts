// src/Game.ts

import { Player } from './Player';
import { Market } from './Market';
import { Card } from './Card';

export class Game {
    players: Player[];             // 玩家数组
    markets: Market[];             // 市场数组
    currentPlayerIndex: number;    // 当前玩家索引

    constructor(players: Player[], markets: Market[]) {
        this.players = players;
        this.markets = markets;
        this.currentPlayerIndex = 0; // 初始化为第一个玩家
    }

    // 切换到下一个玩家
    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        console.log(`现在轮到 ${this.players[this.currentPlayerIndex].name} 的回合`);
    }

    // 当前玩家进行攻击操作
    attackMarket(player: Player, market: Market, cardIndex: number) {
        const card = player.market[cardIndex];

        if (market.isConquered()) {
            console.log(`${market.name} 已经被占领，无法再攻击`);
            return;
        }

        // 如果市场有控制者且控制者不是当前玩家，攻击控制者的卡牌
        const marketOwner = market.owner;
        if (marketOwner && marketOwner !== player) {
            const tauntCards = marketOwner.market.filter(c => c.hasTaunt);
            let targetCard: Card | null = null;

            if (tauntCards.length > 0) {
                // 如果有嘲讽卡，则必须优先攻击嘲讽卡
                targetCard = tauntCards[0];
            } else {
                // 否则攻击对方的一张随机卡
                targetCard = marketOwner.market[Math.floor(Math.random() * marketOwner.market.length)];
            }

            if (targetCard) {
                targetCard.reduceUserRetention(card.marketAttraction);
                console.log(`${player.name} 的 ${card.name} 攻击了 ${marketOwner.name} 的 ${targetCard.name}`);
                targetCard.updateCardStatus();

                // 检查卡牌是否被破坏
                marketOwner.removeDestroyedCards();
            }
        } else {
            // 如果市场没有控制者或者控制者是当前玩家，直接削弱市场期待值
            market.reduceExpectation(card.marketAttraction);
            console.log(`${player.name} 的 ${card.name} 攻击了市场 ${market.name}，减少了 ${card.marketAttraction} 点期待值`);
        }

        // 检查市场是否被占领
        if (market.isConquered()) {
            market.changeOwner(player);
        }
    }

    // 执行玩家的一个回合
    playTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const currentMarket = this.markets[0]; // 简化为只考虑一个市场

        console.log(`轮到 ${currentPlayer.name} 的回合`);

        // 示例：如果手牌中有卡牌，打出第一张卡牌
        if (currentPlayer.hand.length > 0) {
            currentPlayer.playCard(0);
        }

        // 执行一次市场攻击（如果市场中有卡牌）
        if (currentPlayer.market.length > 0) {
            this.attackMarket(currentPlayer, currentMarket, 0);
        }

        // 切换到下一个玩家
        this.switchPlayer();
    }

    // 检查游戏是否结束
    checkGameEnd(): boolean {
        // 检查所有市场是否都已被占领
        const allMarketsConquered = this.markets.every(market => market.isConquered());
        if (allMarketsConquered) {
            console.log("所有市场已被占领，游戏结束！");
            return true;
        }

        // 检查是否有玩家被击败
        const defeatedPlayers = this.players.filter(player => player.isDefeated());
        if (defeatedPlayers.length > 0) {
            defeatedPlayers.forEach(player => console.log(`${player.name} 被击败了`));
            console.log("游戏结束！");
            return true;
        }

        return false;
    }

    // 启动游戏
    startGame() {
        while (true) {
            this.playTurn();

            // 检查游戏是否结束
            if (this.checkGameEnd()) {
                break;
            }
        }
    }
}
