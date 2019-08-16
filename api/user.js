const bcrypt = require('bcryptjs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id // Use this to UPDATE and create with same func

        try {
            existsOrError(user.name, 'Name is not valid')
            existsOrError(user.email, 'Email is not valid')
            existsOrError(user.password, 'Password is not valid')
            existsOrError(user.confirmPassword, 'Confirm password is not valid')
            equalsOrError(user.password, user.confirmPassword, `Passwords don't match`)

            const userFromDB = await app.db('users').where({ email: user.email }).first()

            if (!user.id){
                notExistsOrError(userFromDB, 'User already exists')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        if(user.id) { //Update part
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(() => status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    return { save, get }
}