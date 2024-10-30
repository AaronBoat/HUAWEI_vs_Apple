// src/Player.ts

import { Card } from './Card';

export class Player {
    name: string;
    hand: Card[];       // 玩家手牌
    market: Card[];     // 玩家市场中的卡牌
    health: number;     // 玩家生命值或市场控制点数

    constructor(name: string, initialHealth: number = 20) {
        this.name = name;
        this.hand = [];
        this.market = [];
        this.health = initialHealth;
    }

    // 将卡牌放置到市场中
    playCard(cardIndex: number) {
        if (cardIndex < 0 || cardIndex >= this.hand.length) {
            console.log("无效的卡牌索引");
            return;
        }
        const card = this.hand[cardIndex];
        this.market.push(card);
        this.hand.splice(cardIndex, 1);
        console.log(`${this.name} 打出了卡牌: ${card.toString()}`);
    }

    // 从手牌中移除卡牌
    removeCardFromHand(cardIndex: number) {
        if (cardIndex < 0 || cardIndex >= this.hand.length) {
            console.log("无效的卡牌索引");
            return;
        }
        const removedCard = this.hand.splice(cardIndex, 1)[0];
        console.log(`${this.name} 从手牌中移除了卡牌: ${removedCard.toString()}`);
    }

    // 将破坏的卡牌移出市场
    removeDestroyedCards() {
        const initialLength = this.market.length;
        this.market = this.market.filter(card => !card.isDestroyed());
        if (this.market.length < initialLength) {
            console.log(`${this.name} 的一些卡牌已被破坏并移除市场`);
        }
    }

    // 受到攻击时减少生命值
    reduceHealth(amount: number) {
        this.health = Math.max(0, this.health - amount);
        console.log(`${this.name} 受到了 ${amount} 点伤害，当前生命值为 ${this.health}`);
    }

    // 判断玩家是否已被击败
    isDefeated(): boolean {
        return this.health <= 0;
    }

    // 抽卡的方法
    drawCard(card: Card) {
        this.hand.push(card);
        console.log(`${this.name} 抽到了卡牌: ${card.toString()}`);
    }

    // 显示玩家信息
    toString(): string {
        return `${this.name} - 生命值: ${this.health}, 手牌数量: ${this.hand.length}, 市场卡牌数量: ${this.market.length}`;
    }
}
