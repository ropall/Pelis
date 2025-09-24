// Importa el framework Express
const express = require('express')

const cors = require('cors')
// Configuración de variables de entorno
require('dotenv').config()
const { mongoConn } = require('./databases/configuration')
mongoConn()
// Crea una instancia de la aplicación Express
const app = express()

// Middleware para que Express pueda entender y procesar JSON en las peticiones POST
app.use(express.json())
app.use(cors({ origin: '*' }))


// --- DEFINICIÓN DE ENDPOINTS ---
const generos = require('./routes/generoRoute')


app.use('/generos', generos)

app.get('/', (req, res) => {
  // Respuesta en formato JSON
  res.json({
    mensaje: '¡OK!',
    version: '1.0.0'
  });
});

module.exports = app;