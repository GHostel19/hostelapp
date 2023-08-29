const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config/default");

module.exports=(req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({msg:[{msg: 'No token authorization denied'}]})
    }

    //verify token
    try {
jwt.verify(token, SECRET_KEY, (err, result) => {
if (err) {
    return res.status(401).json({msg: [{msg: 'Token is not valid'}]})
} else {
    req.user=result.user;
    next()
}
})
    } catch (error) {
        console.log('something wrong with auth middleware');
        res.status(500).json({msg: [{msg: 'Server Error'}]})

    }
}

// module.exports = auth;