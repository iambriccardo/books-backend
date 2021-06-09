import { Request, Response } from 'express';

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

export const healthCheck = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const uptime = computeUptime();

    const healthCheck = {
        uptime: `${uptime.hours} Hour(s) ${uptime.minutes} minute(s) ${uptime.seconds} second(s)`,
        message: 'OK',
        timestamp: Date.now(),
    };

    try {
        res.send(healthCheck);
    } catch (e) {
        healthCheck.message = e;
        res.status(503).send(healthCheck);
    }
};

export const createEdgeNGrams = (text: string): string[] => {
    if (text && text.length > 2) {
        const minGram = 2;
        const maxGram = text.length;

        return text
            .split(' ')
            .slice(0, 100)
            .reduce((ngrams: string[], token: string) => {
                if (token.length > minGram) {
                    for (
                        let i = minGram;
                        i <= maxGram && i <= token.length;
                        ++i
                    ) {
                        const gram = token.substr(0, i);
                        ngrams = [...ngrams, gram];
                    }
                } else {
                    ngrams = [...ngrams, token];
                }

                return ngrams;
            }, []);
    }
    return [text];
};
