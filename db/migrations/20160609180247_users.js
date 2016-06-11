
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();

        table.string('app_token').unique();
        table.string('app_os');        
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
