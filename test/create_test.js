const assert = require('assert');
const User = require('./../src/user');

describe('Creating records', () => {

    it ('Saves a user', (done) => {

        const joe = new User({
            name: 'joe'
        });

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });

    });

});