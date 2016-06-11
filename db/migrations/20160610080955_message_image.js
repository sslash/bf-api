
exports.up = function(knex, Promise) {
    return knex.schema.raw('alter table messages add column image text');
};

exports.down = function(knex, Promise) {
    return Promise.resolve();
};
