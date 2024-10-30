// src/Market.ts

import { Player } from './Player';

export class Market {
    name: string;                   // 市场名称
    initialExpectation: number;     // 初始市场期待值
    currentExpectation: number;     // 当前市场期待值
    owner: Player | null;           // 当前市场控制者

    constructor(name: string, initialExpectation: number) {
        this.name = name;
        this.initialExpectation = initialExpectation;
        this.currentExpectation = initialExpectation;
        this.owner = null;
    }

    // 减少市场期待值
    reduceExpectation(amount: number) {
        this.currentExpectation = Math.max(0, this.currentExpectation - amount);
        console.log(`${this.name} 市场的期待值减少了 ${amount} 点，当前期待值为 ${this.currentExpectation}`);
    }

    // 检查市场是否被占领
    isConquered(): boolean {
        return this.currentExpectation <= 0;
    }

    // 变更市场控制者
    changeOwner(newOwner: Player) {
        this.owner = newOwner;
        console.log(`${newOwner.name} 占领了市场 ${this.name}`);
    }

    // 重置市场状态
    resetMarket() {
        this.currentExpectation = this.initialExpectation;
        this.owner = null;
        console.log(`${this.name} 市场已被重置`);
    }

    // 显示市场信息
    toString(): string {
        return `${this.name} - 期待值: ${this.currentExpectation}/${this.initialExpectation}, 控制者: ${this.owner ? this.owner.name : "无"}`;
    }
}
