import { axiosConfig } from "../configuration/axiosConfig";

const obtenerTipos = () => {
    return axiosConfig.get('/tipos', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const crearTipo = (data = {}) => {
    return axiosConfig.post('/tipos', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const obtenerTipoPorId = (id) => {
    return axiosConfig.get(`/tipos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const editarTipo = (id, data = {}) => {
    return axiosConfig.put(`/tipos/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const eliminarTipo = (id) => {
    return axiosConfig.delete(`/tipos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

export {
    crearTipo,
    obtenerTipos,
    obtenerTipoPorId,
    editarTipo,
    eliminarTipo
}


