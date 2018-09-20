import { expect } from 'chai';
import Username from "Domain/User/ValueObject/Username";

describe("Unit test: Username ", () => {
    it('A Username should contain more than 4 chars', () => {

        expect(() => new Username('pa')).to.throw('Username should contain at least 4 chars');
    });
    it('A Username should be converted to string', () => {

        expect(new Username('Pavo').toString()).to.be.eq('Pavo');
    });
});
