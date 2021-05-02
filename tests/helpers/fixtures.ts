import { SellBookBody } from '../../src/controllers/books/sell-book';

export const sellBookBodyFixture = (extraParams = {}): SellBookBody => {
    return {
        isbn: '978-1-56619-909-4',
        title: 'Alice in Wonderland',
        description:
            'Alice in Wonderland has been known for its curious story.',
        currency: 'EUR',
        price: 20,
        condition: 'ok',
        pictures: ['https://cloudinary.com/alice_in_wonderland.png'],
        publicationDate: new Date(),
        seller: '608e519d8c2f4a0a88aa8216',
        locationName: 'Trento',
        locationLatitude: 46.0747793,
        locationLongitude: 11.3547582,
        ...extraParams,
    };
};
