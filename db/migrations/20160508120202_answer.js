// A message has an answer.
exports.up = function(knex, Promise) {
    return knex.schema.createTable('answer', function(table){
        table.increments();

        // will be null if there are answer_options
        table.string('text');

        // if answer can be user input
        table.boolean('user_input_answer').defaultTo(false)

        // there might be
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('answer');
};
