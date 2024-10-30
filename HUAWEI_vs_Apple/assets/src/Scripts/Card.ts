// src/Card.ts

// 定义卡牌的基础类
export class Card {
    name: string;
    marketAttraction: number; // 市场吸引力
    userRetention: number;    // 用户粘性
    hasTaunt: boolean;        // 是否有嘲讽效果
    hasResilience: boolean;   // 是否有坚韧效果
    hasDeflect: boolean;      // 是否有抵御效果
    hasPollenSupport: boolean; // 是否有花粉支持

    constructor(
        name: string,
        marketAttraction: number,
        userRetention: number,
        hasTaunt: boolean = false,
        hasResilience: boolean = false,
        hasDeflect: boolean = false,
        hasPollenSupport: boolean = false
    ) {
        this.name = name;
        this.marketAttraction = marketAttraction;
        this.userRetention = userRetention;
        this.hasTaunt = hasTaunt;
        this.hasResilience = hasResilience;
        this.hasDeflect = hasDeflect;
        this.hasPollenSupport = hasPollenSupport;
    }

    // 减少用户粘性的方法
    reduceUserRetention(amount: number) {
        if (this.hasResilience) {
            // 如果有坚韧效果，则每次减少的用户粘性减半，至少为1
            amount = Math.max(1, Math.floor(amount / 2));
        }
        this.userRetention = Math.max(0, this.userRetention - amount);
    }

    // 判断卡牌是否被破坏
    isDestroyed(): boolean {
        return this.userRetention <= 0 && this.marketAttraction <= 0;
    }

    // 花粉支持效果处理
    handlePollenSupport() {
        if (this.hasPollenSupport && this.userRetention <= 0) {
            // 当用户粘性降到0时，使用吸引力代为扣除
            const reduction = Math.min(1, this.marketAttraction);
            this.marketAttraction -= reduction;
            console.log(
                `${this.name} 触发了花粉支持，吸引力减少 ${reduction} 点，当前吸引力为 ${this.marketAttraction}`
            );
        }
    }

    // 抵御效果处理
    handleDeflect() {
        if (this.hasDeflect && this.userRetention <= 0) {
            // 如果卡牌有抵御效果，用户粘性重置为1，并免疫下一次攻击
            this.userRetention = 1;
            this.hasDeflect = false; // 抵御效果只能触发一次
            console.log(`${this.name} 触发了抵御效果，用户粘性重置为 1`);
        }
    }

    // 更新卡牌状态
    updateCardStatus() {
        // 处理花粉支持效果
        this.handlePollenSupport();

        // 处理抵御效果
        this.handleDeflect();
    }

    // 显示卡牌信息的方法
    toString(): string {
        return `${this.name} - 吸引力: ${this.marketAttraction}, 粘性: ${this.userRetention}, 嘲讽: ${this.hasTaunt ? "是" : "否"}, 坚韧: ${this.hasResilience ? "是" : "否"}, 抵御: ${this.hasDeflect ? "是" : "否"}, 花粉支持: ${this.hasPollenSupport ? "是" : "否"}`;
    }
}
