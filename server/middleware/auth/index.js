import Jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (!token) throw new Error('Access denied')
    Jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, validToken) => {
        if (error)
            throw new Error('Access denied')
        req.user = validToken
        next()
    })
}

export default auth