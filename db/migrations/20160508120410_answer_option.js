// an answer can have a list of answer_options
// a message can have a list of answer_options with corresponding message_texts
exports.up = function(knex, Promise) {
    return knex.schema.createTable('answer_option', function(table){
        table.increments();
        table.string('text').notNullable();
        table.integer('answer_id');
        table.foreign('answer_id').references('answer.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('answer_option');
};
