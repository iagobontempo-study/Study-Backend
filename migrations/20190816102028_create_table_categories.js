
exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parentId').unsigned().references('id').inTable('categories') //important to use unsigned for foreign keys

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories')
};
