// src/Card.ts

// ���忨�ƵĻ�����
export class Card {
    name: string;
    marketAttraction: number; // �г�������
    userRetention: number;    // �û�ճ��
    hasTaunt: boolean;        // �Ƿ��г���Ч��
    hasResilience: boolean;   // �Ƿ��м���Ч��
    hasDeflect: boolean;      // �Ƿ��е���Ч��
    hasPollenSupport: boolean; // �Ƿ��л���֧��

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

    // �����û�ճ�Եķ���
    reduceUserRetention(amount: number) {
        if (this.hasResilience) {
            // ����м���Ч������ÿ�μ��ٵ��û�ճ�Լ��룬����Ϊ1
            amount = Math.max(1, Math.floor(amount / 2));
        }
        this.userRetention = Math.max(0, this.userRetention - amount);
    }

    // �жϿ����Ƿ��ƻ�
    isDestroyed(): boolean {
        return this.userRetention <= 0 && this.marketAttraction <= 0;
    }

    // ����֧��Ч������
    handlePollenSupport() {
        if (this.hasPollenSupport && this.userRetention <= 0) {
            // ���û�ճ�Խ���0ʱ��ʹ����������Ϊ�۳�
            const reduction = Math.min(1, this.marketAttraction);
            this.marketAttraction -= reduction;
            console.log(
                `${this.name} �����˻���֧�֣����������� ${reduction} �㣬��ǰ������Ϊ ${this.marketAttraction}`
            );
        }
    }

    // ����Ч������
    handleDeflect() {
        if (this.hasDeflect && this.userRetention <= 0) {
            // ��������е���Ч�����û�ճ������Ϊ1����������һ�ι���
            this.userRetention = 1;
            this.hasDeflect = false; // ����Ч��ֻ�ܴ���һ��
            console.log(`${this.name} �����˵���Ч�����û�ճ������Ϊ 1`);
        }
    }

    // ���¿���״̬
    updateCardStatus() {
        // ������֧��Ч��
        this.handlePollenSupport();

        // �������Ч��
        this.handleDeflect();
    }

    // ��ʾ������Ϣ�ķ���
    toString(): string {
        return `${this.name} - ������: ${this.marketAttraction}, ճ��: ${this.userRetention}, ����: ${this.hasTaunt ? "��" : "��"}, ����: ${this.hasResilience ? "��" : "��"}, ����: ${this.hasDeflect ? "��" : "��"}, ����֧��: ${this.hasPollenSupport ? "��" : "��"}`;
    }
}
