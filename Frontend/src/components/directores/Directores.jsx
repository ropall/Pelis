import { useEffect, useState } from "react"
import { obtenerDirectores, crearDirector, editarDirector, eliminarDirector } from "../../services/DirectoresService"

export default function Directores() {
  const [directores, setDirectores] = useState([])
  const [nuevoDirector, setNuevoDirector] = useState({ nombres: "", estado: true })
  const [directorEditando, setDirectorEditando] = useState(null)
  const [directorEditado, setDirectorEditado] = useState({ nombres: "", estado: true })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const listarDirectores = async () => {
    try {
      setLoading(true)
      const response = await obtenerDirectores()
      setDirectores(response.data || [])
      setError(null)
    } catch (error) {
      setError("Error al cargar los directores")
      setDirectores([])
    } finally {
      setLoading(false)
    }
  }

  const handleAgregarDirector = async (e) => {
    e.preventDefault()
    const nombres = nuevoDirector.nombres?.trim() || ""
    if (!nombres) return
    try {
      await crearDirector({
        nombres,
        estado: nuevoDirector.estado
      })
      setNuevoDirector({ nombres: "", estado: true })
      setMostrarFormulario(false)
      listarDirectores()
    } catch (error) {
      setError("No se pudo crear el director")
    }
  }

  const handleEditarDirector = (director) => {
    setDirectorEditando(director._id)
    setDirectorEditado({ 
      nombres: director.nombres || "", 
      estado: director.estado !== undefined ? director.estado : true
    })
  }

  const handleGuardarEdicion = async () => {
    const nombres = directorEditado.nombres?.trim() || ""
    if (!nombres) return
    try {
      await editarDirector(directorEditando, {
        nombres,
        estado: directorEditado.estado
      })
      setDirectorEditando(null)
      setDirectorEditado({ nombres: "", estado: true })
      listarDirectores()
    } catch (error) {
      setError("No se pudo actualizar el director")
    }
  }

  const handleCancelarEdicion = () => {
    setDirectorEditando(null)
    setDirectorEditado({ nombres: "", estado: true })
  }

  const handleEliminarDirector = async (id) => {
    if (!window.confirm("¿Eliminar director?")) return
    try {
      await eliminarDirector(id)
      listarDirectores()
    } catch (error) {
      setError("No se pudo eliminar el director")
    }
  }

  useEffect(() => {
    listarDirectores()
  }, [])

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-primary me-2" role="status"><span className="visually-hidden">Loading...</span></div>
        <span className="text-muted">Cargando directores...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button onClick={listarDirectores} className="btn btn-sm btn-danger ms-2">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-3">
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold mb-1">🎬 Gestión de Directores</h2>
        <p className="text-muted">Administra los directores de películas</p>
      </div>

      <div className="alert alert-primary d-flex justify-content-between" role="alert">
        <div>
          <h6 className="mb-0">Estado de los Datos</h6>
          <small>Directores cargados: {directores.length}</small>
        </div>
        <div className="text-end">
          <small className="text-primary">Servidor: {directores.length > 0 ? '✅ Conectado' : '⚠️ Sin datos'}</small>
        </div>
      </div>

      <div className="mb-2">
        <button className="btn btn-primary" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Nuevo Director'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card mb-3">
          <div className="card-header bg-primary text-white">Nuevo Director</div>
          <div className="card-body">
            <form className="row g-2" onSubmit={handleAgregarDirector}>
              <div className="col-md-8">
                <input className="form-control" placeholder="Nombres del director *" value={nuevoDirector.nombres} onChange={(e)=>setNuevoDirector({...nuevoDirector, nombres:e.target.value})} required />
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={nuevoDirector.estado}
                    onChange={(e)=>setNuevoDirector({...nuevoDirector, estado:e.target.checked})}
                  />
                  <label className="form-check-label">Estado activo</label>
                </div>
              </div>
              <div className="col-md-1 d-grid">
                <button className="btn btn-primary" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {directores.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">No hay directores registrados</div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">Lista de Directores ({directores.length})</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Estado</th>
                  <th>Fecha Creación</th>
                  <th>Fecha Actualización</th>
                  <th>ID</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {directores.map((d, index) => (
                  <tr key={d._id || `director-${index}`}>
                    <td>
                      {directorEditando === d._id ? (
                        <input className="form-control form-control-sm" value={directorEditado.nombres} onChange={(e)=>setDirectorEditado({...directorEditado, nombres:e.target.value})} />
                      ) : d.nombres}
                    </td>
                    <td>
                      {directorEditando === d._id ? (
                        <select 
                          className="form-select form-select-sm" 
                          value={directorEditado.estado}
                          onChange={(e)=>setDirectorEditado({...directorEditado, estado:e.target.value === 'true'})}
                        >
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      ) : (
                        <span className={`badge ${d.estado ? 'bg-success' : 'bg-danger'}`}>
                          {d.estado ? 'Activo' : 'Inactivo'}
                        </span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {d.fechaCreacion ? new Date(d.fechaCreacion).toLocaleDateString() : '—'}
                    </td>
                    <td className="small text-muted">
                      {d.fechaActualizacion ? new Date(d.fechaActualizacion).toLocaleDateString() : '—'}
                    </td>
                    <td className="small text-muted">{d._id}</td>
                    <td className="text-end">
                      {directorEditando === d._id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={handleGuardarEdicion}>Guardar</button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={handleCancelarEdicion}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEditarDirector(d)}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={()=>handleEliminarDirector(d._id)}>Eliminar</button>
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
    </div>
  )
}