const jwt = require('jsonwebtoken');
const { findUserByToken } = require('../services/user.service');

const authorization = function (req, res, next) {

    var token = req.headers['x-access-token'];
    var msg = { auth: false, message: 'No token provided.' };
    console.log("token", token)
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

const isTheSameUser = async function (req, res, next) {
    const id = req.params["id"];
    var token = req.headers['x-access-token'];
    if (token === "null" || token == undefined) {
        next()
        return;
    }
    try {
        let user = await findUserByToken(token);
        user.servicios.map(servicio => {
            if (servicio._id.toString() != id) {
                res.status(401).send("Es el mismo usuario")
            }
        })
    } catch (error) {
        next()
        return;
    }
}

module.exports = { authorization, isTheSameUser };
