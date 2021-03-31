import { Book } from './book';

export interface Explore {
    trending: Book[];
    newest: Book[];
    mayInterestYou: Book[];
}
