const mongoose = require('mongoose')

const mongoConn = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI,{
                dbName: 'pelis'
            }
        )
        console.log('Conectado a Mongo')
    } catch(error) {
        console.log('Error', e)
        throw new Error('No se pudo conectar a Mongo')
    }
}

module.exports = { mongoConn }