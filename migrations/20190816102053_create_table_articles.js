//comand on cmd > knex migrate:latest to use DOWN

exports.up = function(knex) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000)
        table.binary('content').notNull()
        table.integer('userId').unsigned().references('id').inTable('users').notNull() // important to use unsigned to foreign keys
        table.integer('categoryId').unsigned().references('id').inTable('categories').notNull() //important to use unsigned to foreign keys
    })
};

//comand on cmd > knex migrate:rollback to use DOWN

exports.down = function(knex) {
    return knex.schema.dropTable('articles')
};
