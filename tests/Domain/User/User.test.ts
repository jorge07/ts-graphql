import User from "Domain/User/User";
import { expect } from 'chai';
import UserWasCreated from "Domain/User/Events/UserWasCreated";

describe("Unit test: User Entity", () => {
    it('should be able to create a user with uuid and username with a fired DomainMessage', () => {
        const user = User.create('lol', 'paco');

        expect(user.getUsername()).to.equals('paco');
        expect(user.getAggregateRootId()).to.equals('lol');

        const stream = user.getUncommitedEvents();
        expect(stream.events.length).to.equals(1);
        expect(stream.events[0].event).to.be.instanceOf(UserWasCreated);
    });
});
