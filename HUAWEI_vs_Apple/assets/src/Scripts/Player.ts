// src/Player.ts

import { Card } from './Card';

export class Player {
    name: string;
    hand: Card[];       // �������
    market: Card[];     // ����г��еĿ���
    health: number;     // �������ֵ���г����Ƶ���

    constructor(name: string, initialHealth: number = 20) {
        this.name = name;
        this.hand = [];
        this.market = [];
        this.health = initialHealth;
    }

    // �����Ʒ��õ��г���
    playCard(cardIndex: number) {
        if (cardIndex < 0 || cardIndex >= this.hand.length) {
            console.log("��Ч�Ŀ�������");
            return;
        }
        const card = this.hand[cardIndex];
        this.market.push(card);
        this.hand.splice(cardIndex, 1);
        console.log(`${this.name} ����˿���: ${card.toString()}`);
    }

    // ���������Ƴ�����
    removeCardFromHand(cardIndex: number) {
        if (cardIndex < 0 || cardIndex >= this.hand.length) {
            console.log("��Ч�Ŀ�������");
            return;
        }
        const removedCard = this.hand.splice(cardIndex, 1)[0];
        console.log(`${this.name} ���������Ƴ��˿���: ${removedCard.toString()}`);
    }

    // ���ƻ��Ŀ����Ƴ��г�
    removeDestroyedCards() {
        const initialLength = this.market.length;
        this.market = this.market.filter(card => !card.isDestroyed());
        if (this.market.length < initialLength) {
            console.log(`${this.name} ��һЩ�����ѱ��ƻ����Ƴ��г�`);
        }
    }

    // �ܵ�����ʱ��������ֵ
    reduceHealth(amount: number) {
        this.health = Math.max(0, this.health - amount);
        console.log(`${this.name} �ܵ��� ${amount} ���˺�����ǰ����ֵΪ ${this.health}`);
    }

    // �ж�����Ƿ��ѱ�����
    isDefeated(): boolean {
        return this.health <= 0;
    }

    // �鿨�ķ���
    drawCard(card: Card) {
        this.hand.push(card);
        console.log(`${this.name} �鵽�˿���: ${card.toString()}`);
    }

    // ��ʾ�����Ϣ
    toString(): string {
        return `${this.name} - ����ֵ: ${this.health}, ��������: ${this.hand.length}, �г���������: ${this.market.length}`;
    }
}
