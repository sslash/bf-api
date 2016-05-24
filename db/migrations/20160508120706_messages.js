exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', function(table){
        table.increments();

        // default text for message. Rendered unless there are
        // messages_for_answer_options
        table.string('text');

        // a message has a conversations
        table.integer('conversations_id');
        table.foreign('conversations_id').references('conversations.id');

        // a message can depend on answer,
        // in which case the answer must be rendered before (hence post) this message
        table.integer('answer_post_id');
        table.foreign('answer_post_id').references('answer.id');

        // an array with messages corresponding to answers_options:
        // [{23: 'Great answer', 24: 'Not so great answer'}]
        table.json('messages_for_answer_options');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages');
};
