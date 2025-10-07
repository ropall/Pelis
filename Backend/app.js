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

// Swagger setup
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
const packageJson = require('./package.json')

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: packageJson.name,
		version: packageJson.version,
		description: packageJson.description,
		contact: packageJson.author ? { name: packageJson.author } : undefined,
		license: packageJson.license ? { name: packageJson.license } : undefined
	},
	servers: [
		{ url: `http://localhost:${process.env.PORT || 3000}` }
	]
}

const swaggerOptions = {
	definition: swaggerDefinition,
	apis: [
		path.join(__dirname, 'routes/*.js')
	]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// --- DEFINICIÓN DE ENDPOINTS ---
const generos = require('./routes/generoRoute')
const directores = require('./routes/directorRoute')
const productoras = require('./routes/productoraRoute')
const tipos = require('./routes/tipoRoute')
const media = require('./routes/mediaRoute')

app.use('/generos', generos)
app.use('/directores', directores)
app.use('/productoras', productoras)
app.use('/tipos', tipos)
app.use('/media', media)

app.get('/', (req, res) => {
  // Respuesta en formato JSON
  res.json({
    mensaje: '¡OK!',
    version: '1.0.0'
  });
});

module.exports = app;