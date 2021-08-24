const express = require('express');
const cors = require('cors')

require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor
const app = express();

app.use(cors());

// base de datos
dbConnection()

// mean_user
// 7EhK4ZxZE1DdmTum
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el: ' + process.env.PORT);
})