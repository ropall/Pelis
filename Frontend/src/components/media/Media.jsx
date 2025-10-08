import { useEffect, useState } from "react"
import { 
  obtenerMedias, 
  crearMedia, 
  editarMedia, 
  eliminarMedia,
  obtenerMediasPorEstado,
  obtenerMediasPorGenero,
  obtenerMediasPorAnio
} from "../../services/MediaService"
import { obtenerGeneros } from "../../services/GeneroService"
import { obtenerDirectores } from "../../services/DirectoresService"
import { obtenerProductoras } from "../../services/ProductorasService"

export default function Media() {
  const [medias, setMedias] = useState([])
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [productoras, setProductoras] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mediaEditando, setMediaEditando] = useState(null)
  const [filtros, setFiltros] = useState({
    genero: '',
    año: ''
  })

  const [nuevaMedia, setNuevaMedia] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    añoEstreno: '',
    generoPrincipal: '',
    director: '',
    productora: ''
  })

  const [mediaEditada, setMediaEditada] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    añoEstreno: '',
    generoPrincipal: '',
    director: '',
    productora: ''
  })

  const listarMedias = async () => {
    try {
      setLoading(true)
      const response = await obtenerMedias()
      setMedias(response.data || [])
      setError(null)
    } catch (error) {
      console.log("Error al cargar media:", error)
      setError("Error al cargar media")
      setMedias([])
    } finally {
      setLoading(false)
    }
  }

  const cargarDatosRelacionados = async () => {
    try {
      const [generosRes, directoresRes, productorasRes] = await Promise.all([
        obtenerGeneros(),
        obtenerDirectores(),
        obtenerProductoras()
      ])
      setGeneros(generosRes.data || [])
      setDirectores(directoresRes.data || [])
      setProductoras(productorasRes.data || [])
    } catch (error) {
      console.log("Error al cargar datos relacionados:", error)
    }
  }

  const aplicarFiltros = async () => {
    try {
      setLoading(true)
      let response

      if (filtros.genero !== '') {
        response = await obtenerMediasPorGenero(filtros.genero)
      } else if (filtros.año !== '') {
        response = await obtenerMediasPorAnio(filtros.año)
      } else {
        response = await obtenerMedias()
      }

      setMedias(response.data || [])
      setError(null)
    } catch (error) {
      console.log("Error al aplicar filtros:", error)
      setError("Error al aplicar filtros")
    } finally {
      setLoading(false)
    }
  }

  const limpiarFiltros = () => {
    setFiltros({ genero: '', año: '' })
    listarMedias()
  }

  const handleCrearMedia = async (e) => {
    e.preventDefault()
    console.log('Datos que se van a enviar:', nuevaMedia)
    try {
      await crearMedia(nuevaMedia)
      setNuevaMedia({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        añoEstreno: '',
        generoPrincipal: '',
        serial: '',
        director: '',
        productora: ''
      })
      setMostrarFormulario(false)
      listarMedias()
    } catch (error) {
      setError("Error al crear media")
    }
  }

  const handleEditarMedia = (media) => {
    setMediaEditando(media._id)
    setMediaEditada({
      serial: media.serial || '',
      titulo: media.titulo || '',
      sinopsis: media.sinopsis || '',
      url: media.url || '',
      imagen: media.imagen || '',
      añoEstreno: media.añoEstreno || '',
      generoPrincipal: media.generoPrincipal?._id || media.generoPrincipal || '',
      director: media.director?._id || media.director || '',
      productora: media.productora?._id || media.productora || ''
    })
  }

  const handleGuardarEdicion = async () => {
    try {
      await editarMedia(mediaEditando, mediaEditada)
      setMediaEditando(null)
      setMediaEditada({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        añoEstreno: '',
        generoPrincipal: '',
        serial: '',
        director: '',
        productora: ''
      })
      listarMedias()
    } catch (error) {
      setError("Error al actualizar media")
    }
  }

  const handleCancelarEdicion = () => {
    setMediaEditando(null)
    setMediaEditada({
      titulo: '',
      sinopsis: '',
      url: '',
      imagen: '',
      añoEstreno: '',
      generoPrincipal: '',
      director: '',
      productora: '',
      estado: true
    })
  }

  const handleEliminarMedia = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta media?")) return
    try {
      await eliminarMedia(id)
      listarMedias()
    } catch (error) {
      setError("Error al eliminar media")
    }
  }

  useEffect(() => {
    listarMedias()
    cargarDatosRelacionados()
  }, [])

  useEffect(() => {
    if (filtros.genero !== '' || filtros.año !== '') {
      aplicarFiltros()
    }
  }, [filtros])

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-primary me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-muted">Cargando media...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <div className="d-flex align-items-center">
          <span className="me-2">⚠️</span>
          <span>{error}</span>
        </div>
        <button onClick={listarMedias} className="btn btn-sm btn-danger mt-2">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-3">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold mb-1">🍿 Gestión de Media</h2>
        <p className="text-muted">Administra películas y series</p>
      </div>

      {/* Estado de los datos */}
      <div className="alert alert-primary d-flex justify-content-between" role="alert">
        <div>
          <h6 className="mb-0">Estado de los Datos</h6>
          <small>Registros cargados: {medias.length}</small>
        </div>
        <div className="text-end">
          <small className="text-primary">Servidor: {medias.length > 0 ? '✅ Conectado' : '⚠️ Sin datos'}</small>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-3">
        <div className="card-header bg-secondary text-white">
          <h6 className="mb-0">Filtros</h6>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Género</label>
              <select 
                className="form-select" 
                value={filtros.genero} 
                onChange={(e) => setFiltros({...filtros, genero: e.target.value})}
              >
                <option value="">Todos</option>
                {generos.map(genero => (
                  <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Año</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Ej: 2023"
                value={filtros.año} 
                onChange={(e) => setFiltros({...filtros, año: e.target.value})}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-secondary me-2" onClick={limpiarFiltros}>
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para agregar nueva media */}
      <div className="mb-3">
        <button 
          className={`btn ${mostrarFormulario ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Nueva Media'}
        </button>
      </div>

      {/* Formulario para agregar media */}
      {mostrarFormulario && (
        <div className="card mb-3">
          <div className="card-header bg-primary text-white">
            <h6 className="mb-0">Nueva Media</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleCrearMedia}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Serial *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={nuevaMedia.serial}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, serial: e.target.value})}
                    placeholder="Ej: MOV001, SER001"
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Título *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={nuevaMedia.titulo}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, titulo: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Sinopsis *</label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    value={nuevaMedia.sinopsis}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, sinopsis: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">URL *</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={nuevaMedia.url}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, url: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Imagen</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={nuevaMedia.imagen}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, imagen: e.target.value})}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Año de Estreno *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={nuevaMedia.añoEstreno}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, añoEstreno: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Género Principal *</label>
                  <select 
                    className="form-select" 
                    value={nuevaMedia.generoPrincipal}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, generoPrincipal: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar género</option>
                    {generos.filter(genero => genero.estado).map(genero => (
                      <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Director *</label>
                  <select 
                    className="form-select" 
                    value={nuevaMedia.director}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, director: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar director</option>
                    {directores.filter(director => director.estado).map(director => (
                      <option key={director._id} value={director._id}>
                        {director.nombres}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Productora *</label>
                  <select 
                    className="form-select" 
                    value={nuevaMedia.productora}
                    onChange={(e) => setNuevaMedia({...nuevaMedia, productora: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar productora</option>
                    {productoras.filter(productora => productora.estado).map(productora => (
                      <option key={productora._id} value={productora._id}>{productora.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary me-2">Guardar</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de media */}
      {medias.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">
          <div className="mx-auto mb-3" style={{ width: 96, height: 96 }}>
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center w-100 h-100 border">
              <span className="text-muted">🎞️</span>
            </div>
          </div>
          <h3 className="h5 mb-2">No hay media disponible</h3>
          <p className="text-muted mb-3">El servidor backend no está devolviendo datos o no está ejecutándose.</p>
          <div className="small text-muted">
            <p className="mb-0"><strong>URL del backend:</strong> http://localhost:3000</p>
            <p className="mb-0"><strong>Endpoint:</strong> /media</p>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="h6 mb-0">Lista de Media ({medias.length})</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {medias.map((media, index) => (
                <div key={media._id || `media-${index}`} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100">
                    {media.imagen ? (
                      <img src={media.imagen} className="card-img-top" alt={media.titulo} style={{height: '200px', objectFit: 'cover'}} />
                    ) : (
                      <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                        <span className="text-muted">🎬</span>
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title mb-1">{media.titulo || 'Sin título'}</h5>
                      <p className="text-muted small mb-2">Serial: {media.serial || 'N/D'}</p>
                      <p className="card-text text-muted small" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {media.sinopsis || 'Sin sinopsis'}
                      </p>
                      <div className="row row-cols-2 g-2 small text-muted mb-2">
                        <div className="col"><span className="badge bg-light text-dark w-100">Año: {media.añoEstreno ?? 'N/D'}</span></div>
                        <div className="col"><span className="badge bg-light text-dark w-100">Género: {media?.generoPrincipal?.nombre || 'N/D'}</span></div>
                        <div className="col"><span className="badge bg-light text-dark w-100">Director: {media?.director?.nombres || 'N/D'}</span></div>
                        <div className="col"><span className="badge bg-light text-dark w-100">Productora: {media?.productora?.nombre || 'N/D'}</span></div>
                      </div>
                      {mediaEditando === media._id ? (
                        <div className="mt-3">
                          <div className="row g-2 mb-3">
                            <div className="col-md-6">
                              <label className="form-label small">Serial</label>
                              <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                value={mediaEditada.serial}
                                onChange={(e) => setMediaEditada({...mediaEditada, serial: e.target.value})}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label small">Título</label>
                              <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                value={mediaEditada.titulo}
                                onChange={(e) => setMediaEditada({...mediaEditada, titulo: e.target.value})}
                              />
                            </div>
                            <div className="col-12">
                              <label className="form-label small">Sinopsis</label>
                              <textarea 
                                className="form-control form-control-sm" 
                                rows="2"
                                value={mediaEditada.sinopsis}
                                onChange={(e) => setMediaEditada({...mediaEditada, sinopsis: e.target.value})}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label small">Año</label>
                              <input 
                                type="number" 
                                className="form-control form-control-sm" 
                                value={mediaEditada.añoEstreno}
                                onChange={(e) => setMediaEditada({...mediaEditada, añoEstreno: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="d-flex gap-1">
                            <button
                              onClick={handleGuardarEdicion}
                              className="btn btn-sm btn-success"
                              title="Guardar cambios"
                            >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={handleCancelarEdicion}
                              className="btn btn-sm btn-outline-secondary"
                              title="Cancelar edición"
                            >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center">
                          {media.url ? (
                            <a href={media.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                              Ver más
                            </a>
                          ) : (
                            <span className="text-muted small">Sin URL</span>
                          )}
                          <div className="d-flex gap-1">
                            <button
                              onClick={() => handleEditarMedia(media)}
                              className="btn btn-sm btn-outline-warning"
                              title="Editar media"
                            >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEliminarMedia(media._id)}
                              className="btn btn-sm btn-outline-danger"
                              title="Eliminar media"
                            >
                              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


