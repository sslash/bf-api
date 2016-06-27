
exports.up = function(knex, Promise) {
    return knex.schema.raw('alter table conversations add column schedule_notification bool');
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
