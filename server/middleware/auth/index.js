import Jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    console.log(req.headers, 'req');
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    console.log(token, 'token here error');

    if(!token) throw new Error('Access denied')
    Jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, validToken) => {
        if(error)  {
            console.log(error, 'here error');
            throw new Error('Access denied')}
        req.user = validToken
        next()
    })
}

export default auth