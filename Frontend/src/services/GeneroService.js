import { axiosConfig } from "../configuration/axiosConfig";

const obtenerGeneros = () => {
    return axiosConfig.get('/generos', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const crearGenero = (data = {}) => {
    return axiosConfig.post('/generos', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const obtenerGenerosPorId = (id) => {
    return axiosConfig.get(`/generos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}
const editarGenero = (id, data = {}) => {
    return axiosConfig.put(`/generos/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const eliminarGenero = (id) => {
    return axiosConfig.delete(`/generos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}


export {
    crearGenero,
    obtenerGeneros,
    obtenerGenerosPorId,
    editarGenero,
    eliminarGenero
}
