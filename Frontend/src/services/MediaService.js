import { axiosConfig } from "../configuration/axiosConfig";

const obtenerMedias = () => {
    return axiosConfig.get('/media', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const crearMedia = (data = {}) => {
    return axiosConfig.post('/media', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const obtenerMediaPorId = (id) => {
    return axiosConfig.get(`/media/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const editarMedia = (id, data = {}) => {
    return axiosConfig.put(`/media/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const eliminarMedia = (id) => {
    return axiosConfig.delete(`/media/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const obtenerMediasPorEstado = (estado) => {
    return axiosConfig.get(`/media/estado`, {
        params: { estado },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const obtenerMediasPorGenero = (generoId) => {
    return axiosConfig.get(`/media/genero/${generoId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const obtenerMediasPorAnio = (anio) => {
    return axiosConfig.get(`/media/año/${anio}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

export {
    crearMedia,
    obtenerMedias,
    obtenerMediaPorId,
    editarMedia,
    eliminarMedia,
    obtenerMediasPorEstado,
    obtenerMediasPorGenero,
    obtenerMediasPorAnio
}


