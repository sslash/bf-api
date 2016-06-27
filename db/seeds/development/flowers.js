
exports.seed = function(knex, Promise) {
      return knex('conversations')
      .insert({
          id: 2,
          name: 'First time'
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
      });
};
