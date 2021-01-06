const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    // Leer el token

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la petición'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }
}


module.exports = {
    validarJWT
}
