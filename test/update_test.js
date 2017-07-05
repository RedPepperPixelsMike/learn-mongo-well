const assert = require('assert');
const User = require('./../src/user');


describe('Updating records', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe', likes: 0});
        joe.save()
            .then(() => {
                done();
            });
    });

    assertName = (operation, done) => {
        operation.then(() => User.find({}))
            .then((users) => {
                assert(users[0].name === 'Mike');
                done();
            });
    };

    it('Instance type using set n save', (done) => {
        joe.set('name', 'Mike');
        assertName(joe.save(), done);
    });

    it('Model instance update', (done) => {
        assertName(joe.update({name: 'Mike'}), done);
    });

    it('A model calss can update', (done) => {
        assertName(
            User.update({name: 'Joe'}, {name: 'Mike'}),
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({name: 'Joe'}, {name: 'Mike'}),
            done
        );
    });

    it('A mode class can find id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Mike'}),
            done
        );
    });

    it('A user can have postcount ++ by 1', (done) => {
        User.update({name: 'Joe'}, {$inc: {likes: 1}})
            .then(() => User.findOne({name: 'Joe'})
            ).then((user) => {
            assert(user.likes === 1);
            done();
        });
    });

});