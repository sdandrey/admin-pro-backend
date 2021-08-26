const express = require('express');
const cors = require('cors')

require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor
const app = express();

app.use(cors());

// Lectura y parseo del body.
app.use( express.json() );

// base de datos
dbConnection()

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))

// mean_user
// 7EhK4ZxZE1DdmTum


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el: ' + process.env.PORT);
})