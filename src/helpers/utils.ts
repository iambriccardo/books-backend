export async function delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export const shuffle = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export interface Uptime {
    hours: number;
    minutes: number;
    seconds: number;
}

export const computeUptime = (): Uptime => {
    let utSeconds = process.uptime();
    let utMinutes = utSeconds / 60;
    let utHours = utMinutes / 60;

    utSeconds = Math.floor(utSeconds);
    utMinutes = Math.floor(utMinutes);
    utHours = Math.floor(utHours);

    utHours = utHours % 60;
    utMinutes = utMinutes % 60;
    utSeconds = utSeconds % 60;

    return {
        hours: utHours,
        minutes: utMinutes,
        seconds: utSeconds,
    };
};
