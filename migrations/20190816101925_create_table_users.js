//comand on cmd >  knex migrate:lastest to use UP

exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary() //setting up as main
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
    })
};

//comand on cmd > knex migrate:rollback to use DOWN

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
