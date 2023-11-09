const Jwt = require('jsonwebtoken');

const admin = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if(!token) throw new Error('Access denied')
    Jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, validToken) => {
        if(error)  throw new Error('Access denied')
        if(!validToken.isAdmin) throw new Error('Not admin!')
        req.user = validToken
        next()
    })
}

module.exports = admin