const assert = require('assert');
const User = require('./../src/user');

describe('REading users out of the database', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'joe'
        });

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });


    it('Finds all users with a name of joe', (done) => {
        User.find({name: 'joe'})
            .then((users) => {
                console.log(joe._id);
                console.log(users[0]._id);
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    })

    it('Shoudl find a user with a particular id', (done) => {
       User.findOne({_id: joe._id})
           .then((user) => {
                assert(user.name === joe.name);
                done();
           });
    });

});