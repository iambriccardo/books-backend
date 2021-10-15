import fs from 'fs';
import { GenericObject } from './types';

export const readJsonFile = (filename: string): GenericObject => {
    const file = fs.readFileSync(`assets/${filename}`, 'utf-8');
    return JSON.parse(file);
};
