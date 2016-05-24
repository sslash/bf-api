exports.seed = function(knex, Promise) {
    return Promise.all[
        knex('conversations').del() // Deletes ALL existing entries

        //
        // Welcome conversation
        //
        .then(function() {
            return knex('conversations').insert({
                id: 1,
                name: 'Welcome',
                created_at: Date.now()
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
        }),

        /**
        * First tip
        */
        knex('conversations')
        .insert({
            id: 2,
            name: 'First tipe',
            created_at: Date.now()
        })
        .then(function () {
            return knex('messages').insert({
                text: 'Good day',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'I assume you have not given your girlfriend flowers for a while.',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'It sound really clisje but guess what.',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('answer').insert({
                text: 'What',
                id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'Your girlfriend still loves it. Yeah. She does. She might say it is weird, or about time. But it really helps. ',
                conversations_id: 2,
                answer_post_id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'So go ahead, buy flowers to your girlfriend on the nearest store, today.',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'When you get home, pick up a nice vase, but water in, cut the tip of the flowers, and put it in.',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'Thats it, I will check on you later',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'By the way, this tip I just gave you',
                conversations_id: 2
            });
        })
        .then(function () {
            return knex('answer').insert({
                text: 'Yeah?',
                id: 3
            });
        })
        .then(function () {
            return knex('messages').insert({
                text: 'It was really basic. So just chill, it gets better.',
                answer_post_id: 3,
                conversations_id: 2
            });
        })
    ] // end of Promise.all()
};
