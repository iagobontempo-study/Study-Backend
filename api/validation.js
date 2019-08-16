module.exports = app => {

    const emailRegex = /\S+@\S+\.\S+/
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

    function existsOrError( value, msg ) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError( value, msg ) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }
    
    function equalsOrError ( valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    // function badMail ( email, msg ) {
    //     if (!email.match(emailRegex)) throw msg
    // }

    // function badPassword ( password, msg) {
    //     if (!password.match(passwordRegex)) throw msg
    // }
    
    
    return { existsOrError, notExistsOrError, equalsOrError }
    // i can grab this functions by : app.api.validation.FUNCTIONNAME
}