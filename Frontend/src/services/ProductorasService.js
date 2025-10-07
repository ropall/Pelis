import { axiosConfig } from "../configuration/axiosConfig";

const obtenerProductoras = () => { 
    return axiosConfig.get('/productoras', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const crearProductora = (data = {}) => {
return axiosConfig.post('/productoras', data, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const obtenerProductorasPorId = (id) => {
return axiosConfig.get(`/productoras/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const editarProductora = (id, data = {}) => {
return axiosConfig.put(`/productoras/${id}`, data, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

const eliminarProductora = (id) => {
return axiosConfig.delete(`/productoras/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
}

export {
crearProductora,
obtenerProductoras,
obtenerProductorasPorId,
editarProductora,
eliminarProductora
}
