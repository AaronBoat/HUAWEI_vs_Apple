// src/utils.ts

// ����ָ����Χ�ڵ��������
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ����ٷֱȼ����Ƿ�ɹ�
export function isChanceSuccessful(chance: number): boolean {
    return Math.random() * 100 < chance;
}

// ��ʽ����־��Ϣ
export function formatLogMessage(message: string, type: 'info' | 'warning' | 'error' = 'info'): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${type.toUpperCase()}] ${message}`;
}

// ��ӡ��ʽ������־��Ϣ
export function logMessage(message: string, type: 'info' | 'warning' | 'error' = 'info') {
    console.log(formatLogMessage(message, type));
}

// �ӳ�ִ�еĺ���������ģ���첽��Ϊ��
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
