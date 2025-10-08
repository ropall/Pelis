import { useEffect, useState } from "react"
import { obtenerProductoras, crearProductora, editarProductora, eliminarProductora } from "../../services/ProductorasService"

export default function Productoras() {
  const [productoras, setProductoras] = useState([])
  const [nuevaProductora, setNuevaProductora] = useState({ nombre: "", slogan: "", descripcion: "", estado: true })
  const [productoraEditando, setProductoraEditando] = useState(null)
  const [productoraEditada, setProductoraEditada] = useState({ nombre: "", slogan: "", descripcion: "", estado: true })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const listarProductoras = async () => {
    try {
      setLoading(true)
      const response = await obtenerProductoras()
      setProductoras(response.data || [])
      setError(null)
    } catch (error) {
      console.log("Error al cargar productoras:", error)
      setError("Error al cargar las productoras")
      setProductoras([])
    } finally {
      setLoading(false)
    }
  }

  const handleAgregarProductora = async (e) => {
    e.preventDefault()
    const nombre = nuevaProductora.nombre?.trim() || ""
    
    if (nombre) {
      try {
        await crearProductora({
          nombre,
          slogan: nuevaProductora.slogan?.trim() || "",
          descripcion: nuevaProductora.descripcion?.trim() || "",
          estado: nuevaProductora.estado
        })
        setNuevaProductora({ nombre: "", slogan: "", descripcion: "", estado: true })
        setMostrarFormulario(false)
        listarProductoras()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleEditarProductora = (productora) => {
    setProductoraEditando(productora._id)
    setProductoraEditada({ 
      nombre: productora.nombre || "", 
      slogan: productora.slogan || "", 
      descripcion: productora.descripcion || "",
      estado: productora.estado !== undefined ? productora.estado : true
    })
  }

  const handleGuardarEdicion = async () => {
    const nombre = productoraEditada.nombre?.trim() || ""
    
    if (nombre) {
      try {
        await editarProductora(productoraEditando, {
          nombre,
          slogan: productoraEditada.slogan?.trim() || "",
          descripcion: productoraEditada.descripcion?.trim() || "",
          estado: productoraEditada.estado
        })
        setProductoraEditando(null)
        setProductoraEditada({ nombre: "", slogan: "", descripcion: "", estado: true })
        listarProductoras()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCancelarEdicion = () => {
    setProductoraEditando(null)
    setProductoraEditada({ nombre: "", slogan: "", descripcion: "", estado: true })
  }

  const handleEliminarProductora = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta productora?")) {
      try {
        await eliminarProductora(id)
        listarProductoras()
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    listarProductoras()
  }, [])

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-warning me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-muted">Cargando productoras...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <div className="d-flex align-items-center">
          <svg width="20" height="20" className="text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        <button 
          onClick={listarProductoras}
          className="btn btn-sm btn-danger mt-2"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="container py-3">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold mb-1">🎬 Gestión de Productoras</h2>
        <p className="text-muted">Administra las productoras de películas</p>
      </div>

      {/* Estado de los datos */}
      <div className="alert alert-warning d-flex justify-content-between" role="alert">
        <div>
          <h6 className="mb-0">Estado de los Datos</h6>
          <small>Productoras cargadas: {productoras.length}</small>
        </div>
        <div className="text-end">
          <small className="text-warning">Servidor: {productoras.length > 0 ? '✅ Conectado' : '⚠️ Sin datos'}</small>
        </div>
      </div>

      {/* Botón para agregar nueva productora */}
      <div className="mb-3">
        <button 
          className={`btn ${mostrarFormulario ? 'btn-secondary' : 'btn-warning'}`}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Nueva Productora'}
        </button>
      </div>

      {/* Formulario para agregar productora */}
      {mostrarFormulario && (
        <div className="card mb-3">
          <div className="card-header bg-warning text-dark">
            <div className="d-flex align-items-center">
              <svg width="24" height="24" className="me-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="h5 mb-0">Nueva Productora</h3>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleAgregarProductora}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre de la Productora *
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nuevaProductora.nombre}
                  onChange={(e) => setNuevaProductora({...nuevaProductora, nombre: e.target.value})}
                  placeholder="Ej: Warner Bros, Disney, Netflix..."
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="slogan" className="form-label">
                  Slogan
                </label>
                <input
                  type="text"
                  id="slogan"
                  value={nuevaProductora.slogan}
                  onChange={(e) => setNuevaProductora({...nuevaProductora, slogan: e.target.value})}
                  placeholder="Ej: 'The Magic of Disney', 'Just Do It'..."
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  value={nuevaProductora.descripcion}
                  onChange={(e) => setNuevaProductora({...nuevaProductora, descripcion: e.target.value})}
                  placeholder="Descripción de la productora, historia, especialidades..."
                  rows={4}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="estado"
                    checked={nuevaProductora.estado}
                    onChange={(e) => setNuevaProductora({...nuevaProductora, estado: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="estado">
                    Estado activo
                  </label>
                </div>
              </div>
              <div className="d-flex gap-3">
                <button 
                  type="submit" 
                  className="btn btn-warning flex-fill"
                >
                  <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Productora
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary flex-fill"
                  onClick={() => setMostrarFormulario(false)}
                >
                  <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de productoras */}
      {productoras.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">
          <div className="mx-auto mb-3" style={{ width: 96, height: 96 }}>
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center w-100 h-100 border">
              <svg width="48" height="48" className="text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
          <h3 className="h5 mb-2">No hay productoras registradas</h3>
          <p className="text-muted mb-3">
            El servidor backend no está devolviendo datos o no está ejecutándose.
          </p>
          <div className="small text-muted">
            <p className="mb-0"><strong>URL del backend:</strong> http://localhost:3000</p>
            <p className="mb-0"><strong>Endpoint:</strong> /productoras</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-warning text-dark">
            <h3 className="h6 mb-0">Lista de Productoras ({productoras.length})</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {productoras.map((productora, index) => (
                <div key={productora._id || `productora-${index}`} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="w-10 h-10 bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                          <span className="text-warning fw-semibold small">
                            {(productora.nombre || '').charAt(0)}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          {productoraEditando === productora._id ? (
                            <div className="row g-2">
                              <div className="col-12">
                                <input 
                                  className="form-control form-control-sm" 
                                  value={productoraEditada.nombre} 
                                  onChange={(e) => setProductoraEditada({...productoraEditada, nombre: e.target.value})} 
                                  placeholder="Nombre"
                                />
                              </div>
                              <div className="col-12">
                                <input 
                                  className="form-control form-control-sm" 
                                  value={productoraEditada.slogan} 
                                  onChange={(e) => setProductoraEditada({...productoraEditada, slogan: e.target.value})} 
                                  placeholder="Slogan"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="fw-medium text-dark">
                                {productora.nombre || 'Sin nombre'}
                              </div>
                              <div className="small text-muted">
                                {productora.slogan || 'Sin slogan'}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="small text-muted mb-1">Descripción</div>
                        {productoraEditando === productora._id ? (
                          <textarea
                            className="form-control form-control-sm"
                            value={productoraEditada.descripcion}
                            onChange={(e) => setProductoraEditada({...productoraEditada, descripcion: e.target.value})}
                            placeholder="Descripción"
                            rows={2}
                          />
                        ) : (
                          <div className="small text-dark" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {productora.descripcion || 'Sin descripción'}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between small">
                          <div className="d-flex align-items-center">
                            {productoraEditando === productora._id ? (
                              <select 
                                className="form-select form-select-sm" 
                                value={productoraEditada.estado}
                                onChange={(e) => setProductoraEditada({...productoraEditada, estado: e.target.value === 'true'})}
                                style={{width: 'auto'}}
                              >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                              </select>
                            ) : (
                              <>
                                <div className={`w-2 h-2 rounded-circle me-2 ${productora.estado ? 'bg-success' : 'bg-danger'}`}></div>
                                <span className="text-muted">{productora.estado ? 'Activo' : 'Inactivo'}</span>
                              </>
                            )}
                          </div>
                          <span className="text-muted">
                            {productora.fechaCreacion ? new Date(productora.fechaCreacion).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-light text-dark small">
                          ID: {productora._id}
                        </span>
                        <div className="d-flex gap-1">
                          {productoraEditando === productora._id ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditarProductora(productora)}
                                className="btn btn-sm btn-outline-warning"
                                title="Editar productora"
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleEliminarProductora(productora._id)}
                                className="btn btn-sm btn-outline-danger"
                                title="Eliminar productora"
                              >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
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

