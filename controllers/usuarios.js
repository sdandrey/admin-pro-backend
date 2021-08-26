
const Usuario = require('../models/usuario');
const { response } = require('express');
const bycryp = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta esta registrado',
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar contrasena
        const salt = bycryp.genSaltSync();
        usuario.password = bycryp.hashSync(password, salt);
        await usuario.save();
        const token = await generarJWT(usuario._id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..."
        });
    }
};

const actualizarUsuario = async (req, res = response) => {
    // TODO: Validar token y comprobar que es el usuario correcto.
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        const campos = req.body;
        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
        res.json({
            ok: true,
            uid: uid,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
};

const borrarUsuario = async (req, res = response) => {
    // TODO: Validar token y comprobar que es el usuario correcto.
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete (uid);

        res.json({
            ok: true,
            uid: uid,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
};

// 61256d72b172271597437240

module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario };