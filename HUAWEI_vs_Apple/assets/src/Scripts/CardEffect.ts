// src/CardEffect.ts

import { Card } from './Card';

export class CardEffect {
    // 处理坚韧效果
    static handleResilience(card: Card, damage: number): number {
        if (card.hasResilience) {
            // 如果卡牌有坚韧效果，则减少的用户粘性减半（至少为 1）
            const reducedDamage = Math.max(1, Math.floor(damage / 2));
            console.log(`${card.name} 触发了坚韧效果，伤害减半至 ${reducedDamage}`);
            return reducedDamage;
        }
        return damage;
    }

    // 处理花粉支持效果
    static handlePollenSupport(card: Card) {
        if (card.hasPollenSupport && card.userRetention <= 0) {
            // 当用户粘性降到 0 时，使用吸引力代替粘性进行扣除
            if (card.marketAttraction > 0) {
                card.marketAttraction = Math.max(0, card.marketAttraction - 1);
                console.log(`${card.name} 触发了花粉支持，用户粘性为 0，吸引力减少 1，当前吸引力为 ${card.marketAttraction}`);
            } else {
                console.log(`${card.name} 的吸引力也降为 0，卡牌即将被移除`);
            }
        }
    }

    // 处理抵御效果
    static handleDeflect(card: Card) {
        if (card.hasDeflect && card.userRetention <= 0) {
            // 如果卡牌有抵御效果，用户粘性重置为 1，并移除抵御效果
            card.userRetention = 1;
            card.hasDeflect = false; // 抵御效果只能触发一次
            console.log(`${card.name} 触发了抵御效果，用户粘性重置为 1`);
        }
    }

    // 处理所有卡牌状态更新
    static updateCardStatus(card: Card) {
        // 处理花粉支持效果
        CardEffect.handlePollenSupport(card);

        // 处理抵御效果
        CardEffect.handleDeflect(card);
    }
}
