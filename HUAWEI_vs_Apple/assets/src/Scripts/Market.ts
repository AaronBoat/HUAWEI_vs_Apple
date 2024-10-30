// src/Market.ts

import { Player } from './Player';

export class Market {
    name: string;                   // �г�����
    initialExpectation: number;     // ��ʼ�г��ڴ�ֵ
    currentExpectation: number;     // ��ǰ�г��ڴ�ֵ
    owner: Player | null;           // ��ǰ�г�������

    constructor(name: string, initialExpectation: number) {
        this.name = name;
        this.initialExpectation = initialExpectation;
        this.currentExpectation = initialExpectation;
        this.owner = null;
    }

    // �����г��ڴ�ֵ
    reduceExpectation(amount: number) {
        this.currentExpectation = Math.max(0, this.currentExpectation - amount);
        console.log(`${this.name} �г����ڴ�ֵ������ ${amount} �㣬��ǰ�ڴ�ֵΪ ${this.currentExpectation}`);
    }

    // ����г��Ƿ�ռ��
    isConquered(): boolean {
        return this.currentExpectation <= 0;
    }

    // ����г�������
    changeOwner(newOwner: Player) {
        this.owner = newOwner;
        console.log(`${newOwner.name} ռ�����г� ${this.name}`);
    }

    // �����г�״̬
    resetMarket() {
        this.currentExpectation = this.initialExpectation;
        this.owner = null;
        console.log(`${this.name} �г��ѱ�����`);
    }

    // ��ʾ�г���Ϣ
    toString(): string {
        return `${this.name} - �ڴ�ֵ: ${this.currentExpectation}/${this.initialExpectation}, ������: ${this.owner ? this.owner.name : "��"}`;
    }
}
