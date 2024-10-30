// src/utils.ts

// 生成指定范围内的随机整数
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 计算百分比几率是否成功
export function isChanceSuccessful(chance: number): boolean {
    return Math.random() * 100 < chance;
}

// 格式化日志信息
export function formatLogMessage(message: string, type: 'info' | 'warning' | 'error' = 'info'): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${type.toUpperCase()}] ${message}`;
}

// 打印格式化的日志信息
export function logMessage(message: string, type: 'info' | 'warning' | 'error' = 'info') {
    console.log(formatLogMessage(message, type));
}

// 延迟执行的函数（用于模拟异步行为）
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
