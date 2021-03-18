import { suite, test } from '@testdeck/mocha';
import { should, expect } from 'chai';

should();

@suite
class Test {
    @test 'sum should be 10'() {
        expect(10).to.be.equal(10);
    }
}
