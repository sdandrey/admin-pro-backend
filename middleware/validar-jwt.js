const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // Leet el token
    const token = req.header('x-token');
    console.log(token);

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        console.log(uid);
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = { validarJWT };