import { useEffect, useState } from "react"
import { obtenerGeneros, crearGenero, editarGenero, eliminarGenero } from "../../services/GeneroService"

export default function Generos() {
  const [generos, setGeneros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nuevo, setNuevo] = useState({ nombre: "", descripcion: "", estado: true })
  const [editandoId, setEditandoId] = useState(null)
  const [editado, setEditado] = useState({ nombre: "", descripcion: "", estado: true })

  const listarGeneros = async () => {
    try {
      setLoading(true)
      const response = await obtenerGeneros()
      setGeneros(response.data || [])
      setError(null)
    } catch (error) {
      setError("Error al cargar los géneros")
      setGeneros([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    listarGeneros()
  }, [])

  const onCrear = async (e) => {
    e.preventDefault()
    const nombre = (nuevo.nombre || '').trim()
    const descripcion = (nuevo.descripcion || '').trim()
    if (!nombre) return
    try {
      await crearGenero({ nombre, descripcion, estado: nuevo.estado })
      setNuevo({ nombre: "", descripcion: "", estado: true })
      listarGeneros()
    } catch (e) {
      setError("No se pudo crear el género")
    }
  }

  const onGuardar = async () => {
    const nombre = (editado.nombre || '').trim()
    const descripcion = (editado.descripcion || '').trim()
    if (!nombre) return
    try {
      await editarGenero(editandoId, { nombre, descripcion, estado: editado.estado })
      setEditandoId(null)
      setEditado({ nombre: "", descripcion: "", estado: true })
      listarGeneros()
    } catch (e) {
      setError("No se pudo actualizar el género")
    }
  }

  const onEliminar = async (id) => {
    if (!window.confirm('¿Eliminar género?')) return
    try {
      await eliminarGenero(id)
      listarGeneros()
    } catch (e) {
      setError("No se pudo eliminar el género")
    }
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-success me-2" role="status"><span className="visually-hidden">Loading...</span></div>
        <span className="text-muted">Cargando géneros...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button onClick={listarGeneros} className="btn btn-sm btn-danger ms-2">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-3">
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold mb-1">🎭 Gestión de Géneros</h2>
        <p className="text-muted">Administra los géneros de películas</p>
      </div>

      <div className="alert alert-info d-flex justify-content-between" role="alert">
        <div>
          <h6 className="mb-0">Estado de los Datos</h6>
          <small>Géneros cargados: {generos.length}</small>
        </div>
        <div className="text-end">
          <small className="text-info">Servidor: {generos.length > 0 ? '✅ Conectado' : '⚠️ Sin datos'}</small>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header bg-success text-white">Crear nuevo género</div>
        <div className="card-body">
          <form onSubmit={onCrear}>
            <div className="row g-2 mb-2">
              <div className="col-md-6">
                <input className="form-control" placeholder="Nombre del género *" value={nuevo.nombre} onChange={(e)=>setNuevo({...nuevo, nombre: e.target.value })} required />
              </div>
              <div className="col-md-6 d-grid">
                <button className="btn btn-success" type="submit">Guardar</button>
              </div>
            </div>
            <div className="row g-2 mb-2">
              <div className="col-12">
                <textarea 
                  className="form-control" 
                  placeholder="Descripción del género (opcional)" 
                  value={nuevo.descripcion} 
                  onChange={(e)=>setNuevo({...nuevo, descripcion: e.target.value })}
                  rows="2"
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col-12 d-flex align-items-center">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="estado"
                    checked={nuevo.estado}
                    onChange={(e)=>setNuevo({...nuevo, estado: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="estado">
                    Estado activo
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {generos.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">No hay géneros disponibles</div>
      ) : (
        <div className="card">
          <div className="card-header bg-success text-white">Lista de Géneros ({generos.length})</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fecha Creación</th>
                  <th>Fecha Actualización</th>
                  <th>ID</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {generos.map((g, index) => (
                  <tr key={g._id || `genero-${index}`}>
                    <td>
                      {editandoId === g._id ? (
                        <input className="form-control form-control-sm" value={editado.nombre} onChange={(e)=>setEditado({...editado, nombre: e.target.value })} />
                      ) : g.nombre}
                    </td>
                    <td>
                      {editandoId === g._id ? (
                        <textarea 
                          className="form-control form-control-sm" 
                          value={editado.descripcion} 
                          onChange={(e)=>setEditado({...editado, descripcion: e.target.value })}
                          rows="2"
                        />
                      ) : (
                        <span className="small text-muted">
                          {g.descripcion || '—'}
                        </span>
                      )}
                    </td>
                    <td>
                      {editandoId === g._id ? (
                        <select 
                          className="form-select form-select-sm" 
                          value={editado.estado}
                          onChange={(e)=>setEditado({...editado, estado: e.target.value === 'true'})}
                        >
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      ) : (
                        <span className={`badge ${g.estado ? 'bg-success' : 'bg-danger'}`}>
                          {g.estado ? 'Activo' : 'Inactivo'}
                        </span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {g.fechaCreacion ? new Date(g.fechaCreacion).toLocaleDateString() : '—'}
                    </td>
                    <td className="small text-muted">
                      {g.fechaActualizacion ? new Date(g.fechaActualizacion).toLocaleDateString() : '—'}
                    </td>
                    <td className="small text-muted">{g._id}</td>
                    <td className="text-end">
                      {editandoId === g._id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={onGuardar}>Guardar</button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={()=>{setEditandoId(null); setEditado({ nombre: "", descripcion: "", estado: true })}}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>{setEditandoId(g._id); setEditado({ nombre: g.nombre || '', descripcion: g.descripcion || '', estado: g.estado !== undefined ? g.estado : true })}}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={()=>onEliminar(g._id)}>Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Debug oculto en producción */}
    </div>
  )
}