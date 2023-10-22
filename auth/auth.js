const jwt = require('jsonwebtoken');

const authorization = function (req, res, next) {

    var token = req.headers['x-access-token'];
    console.log("token", token);
    var msg = { auth: false, message: 'No token provided.' };
    if (!token)
        res.status(500).send(msg);

    let sec = process.env.TOKEN_SECRET;
    //console.log("secret",sec)
    jwt.verify(token, sec, function (err, decoded) {
        var msg = { auth: false, message: 'Failed to authenticate token.' };
        if (err)
            res.status(500).send(msg);
        req.userId = decoded.id;
        next();
    });
}

module.exports = authorization;
