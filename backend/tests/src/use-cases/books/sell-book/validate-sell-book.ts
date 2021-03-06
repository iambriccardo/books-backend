import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
    currencyFixture,
    sellBookBodyFixture,
} from '../../../../helpers/fixtures';
import { validateSellBookUseCase } from '../../../../../src/use-cases/books/sell-book/validate-sell-book';

use(chaiAsPromised);

describe('validateSellBookUseCase', function () {
    it('should return the body if the validation has been successful', async function () {
        const body = sellBookBodyFixture();

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.be.deep.equal(body);
    });

    it('should throw an error if isbn field is invalid', async function () {
        const body = sellBookBodyFixture({
            isbn: '1234',
        });

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if title field is empty', async function () {
        const body = sellBookBodyFixture({
            title: '',
        });

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if description field is empty', async function () {
        const body = sellBookBodyFixture({
            description: '',
        });

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if currency field is empty', async function () {
        const body = sellBookBodyFixture({
            currency: '',
        });

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if locationName field is empty', async function () {
        const body = sellBookBodyFixture({
            locationName: '',
        });

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if pictures are invalid', async function () {
        const body = sellBookBodyFixture({
            pictures: ['image1', 'image2'],
        });

        const useCase = validateSellBookUseCase(body, [currencyFixture()]);

        await expect(useCase()).to.be.rejected;
    });
});
