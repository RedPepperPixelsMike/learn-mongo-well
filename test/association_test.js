const mongoose = require('mongoose');
const User = require('./../src/user');

const Comment = require('./../src/comment');
const BlogPost = require('./../src/blogPost');
const assert = require('assert');


describe('Associations', () => {

    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({
            title : 'Yo man',
            content: 'Yes hello awesome'
        });
        comment = new Comment({
            content: 'Congrats on great post'
        });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(),
        blogPost.save(),
        comment.save()])
            .then(() => done());
    });

    it('Saves a relation between user and blog post', (done) => {
       User.findOne({ name: 'Joe'})
           .populate('blogPosts')
           .then((user) => {
                assert(user.blogPosts[0].title === "Yo man");
                done();
           });
    });


    it.only('Saves a full relation tree', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {

                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'Yo man');
                assert(user.blogPosts[0].comments[0].content === "Congrats on great post");
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');

                done();
            });
    });

});
