const {Schema, model} = require('mongoose')


const TipoSchema = Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true    
    },
    fechaCreacion : {
        type: Date,
        default: new Date()
    },
    fechaActualizacion : {
        type: Date,
        default: new Date() 
    },
    descripcion : {
        type: String
    }
})

module.exports = model('Tipo', TipoSchema)