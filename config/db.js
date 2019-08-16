const config = require('../knexfile.js')
const knex = require('knex')(config)

//knex.migrate.latest([config]) // USE THIS TO INITIALIZE FIRST TIME, TO MAKE MIGRATIONS RUN INTO MYSQL
module.exports = knex