exports.seed = function(knex, Promise) {
    return knex('messages')
        .del()
        .then(function () {
            return knex('answer').del();
        })
        .then(function () {
            return knex('conversations').del();
        }) // Deletes ALL existing entries

    //
    // Welcome conversation
    //
    .then(function() {
        return knex('conversations').insert({
            id: 1,
            name: 'Welcome'
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'Hi',
            conversations_id: 1
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'My name is Angela',
            conversations_id: 1
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'I will be your couple councellor',
            conversations_id: 1
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'With only you involved. Of course. No reason to involve your GF.',
            conversations_id: 1
        });
    })
    .then(function () {
        return knex('messages').insert({
            text: 'That would be awkward.',
            conversations_id: 1
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'Anyway, what is your name?',
            conversations_id: 1
        });
    }).then(function () {
        return knex('answer').insert({
            user_input_answer: true,
            id: 1
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'Hi $1, nice to meet you. We will become great friends. I am pretty certain. Allthough sometimes, you will not like me as much',
            conversations_id: 1,
            answer_post_id: 1
        });
    }).then(function () {
        return knex('messages').insert({
            text: 'That is all for now. I will come back to you later. Bye.',
            conversations_id: 1
        });
    })
};
