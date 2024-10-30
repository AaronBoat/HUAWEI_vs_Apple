// src/CardEffect.ts

import { Card } from './Card';

export class CardEffect {
    // �������Ч��
    static handleResilience(card: Card, damage: number): number {
        if (card.hasResilience) {
            // ��������м���Ч��������ٵ��û�ճ�Լ��루����Ϊ 1��
            const reducedDamage = Math.max(1, Math.floor(damage / 2));
            console.log(`${card.name} �����˼���Ч�����˺������� ${reducedDamage}`);
            return reducedDamage;
        }
        return damage;
    }

    // ������֧��Ч��
    static handlePollenSupport(card: Card) {
        if (card.hasPollenSupport && card.userRetention <= 0) {
            // ���û�ճ�Խ��� 0 ʱ��ʹ������������ճ�Խ��п۳�
            if (card.marketAttraction > 0) {
                card.marketAttraction = Math.max(0, card.marketAttraction - 1);
                console.log(`${card.name} �����˻���֧�֣��û�ճ��Ϊ 0������������ 1����ǰ������Ϊ ${card.marketAttraction}`);
            } else {
                console.log(`${card.name} ��������Ҳ��Ϊ 0�����Ƽ������Ƴ�`);
            }
        }
    }

    // �������Ч��
    static handleDeflect(card: Card) {
        if (card.hasDeflect && card.userRetention <= 0) {
            // ��������е���Ч�����û�ճ������Ϊ 1�����Ƴ�����Ч��
            card.userRetention = 1;
            card.hasDeflect = false; // ����Ч��ֻ�ܴ���һ��
            console.log(`${card.name} �����˵���Ч�����û�ճ������Ϊ 1`);
        }
    }

    // �������п���״̬����
    static updateCardStatus(card: Card) {
        // ������֧��Ч��
        CardEffect.handlePollenSupport(card);

        // �������Ч��
        CardEffect.handleDeflect(card);
    }
}
