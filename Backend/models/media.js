const {Schema, model} = require('mongoose')

const MediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es obligatoria']
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true
    },
    imagen: {
        type: String
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    añoEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: [true, 'El género principal es obligatorio']
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: [true, 'El director es obligatorio']
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: [true, 'La productora es obligatoria']
    }
})

module.exports = model('Media', MediaSchema)
