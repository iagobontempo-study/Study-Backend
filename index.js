const app = require('express')()
const consign = require('consign')

consign() // Inject middlewares inside application
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3333, () => {
    console.log('Backend executando...')
})