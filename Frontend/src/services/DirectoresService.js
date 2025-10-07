import { axiosConfig } from "../configuration/axiosConfig";

const obtenerDirectores = () => { 
    return axiosConfig.get('/directores', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const crearDirector = (data = {}) => {
return axiosConfig.post('/directores', data, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const obtenerDirectoresPorId = (id) => {
return axiosConfig.get(`/directores/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}
const editarDirector = (id, data = {}) => {
return axiosConfig.put(`/directores/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const eliminarDirector = (id) => {
return axiosConfig.delete(`/directores/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}


export {
crearDirector   ,
obtenerDirectores,
obtenerDirectoresPorId,
editarDirector,
eliminarDirector
}
