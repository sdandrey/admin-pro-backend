const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return req.status(404).json({
                ok: false,
                msg: ''
            })
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        console.log('password');
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password'
            });
        }

        // Generar json web token:

        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { login }