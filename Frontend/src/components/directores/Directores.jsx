import { useEffect, useState } from "react"
import { obtenerDirectores, crearDirector, editarDirector, eliminarDirector } from "../../services/DirectoresService"

export default function Directores() {
  const [directores, setDirectores] = useState([])
  const [nuevoDirector, setNuevoDirector] = useState({ nombre: "", apellido: "", nacionalidad: "" })
  const [directorEditando, setDirectorEditando] = useState(null)
  const [directorEditado, setDirectorEditado] = useState({ nombre: "", apellido: "", nacionalidad: "" })
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
    const nombre = nuevoDirector.nombre?.trim() || ""
    const apellido = nuevoDirector.apellido?.trim() || ""
    if (!nombre || !apellido) return
    try {
      await crearDirector({
        nombre,
        apellido,
        nacionalidad: nuevoDirector.nacionalidad?.trim() || ""
      })
      setNuevoDirector({ nombre: "", apellido: "", nacionalidad: "" })
      setMostrarFormulario(false)
      listarDirectores()
    } catch (error) {
      setError("No se pudo crear el director")
    }
  }

  const handleEditarDirector = (director) => {
    setDirectorEditando(director.id)
    setDirectorEditado({ 
      nombre: director.nombre || "", 
      apellido: director.apellido || "", 
      nacionalidad: director.nacionalidad || "" 
    })
  }

  const handleGuardarEdicion = async () => {
    const nombre = directorEditado.nombre?.trim() || ""
    const apellido = directorEditado.apellido?.trim() || ""
    if (!nombre || !apellido) return
    try {
      await editarDirector(directorEditando, {
        nombre,
        apellido,
        nacionalidad: directorEditado.nacionalidad?.trim() || ""
      })
      setDirectorEditando(null)
      setDirectorEditado({ nombre: "", apellido: "", nacionalidad: "" })
      listarDirectores()
    } catch (error) {
      setError("No se pudo actualizar el director")
    }
  }

  const handleCancelarEdicion = () => {
    setDirectorEditando(null)
    setDirectorEditado({ nombre: "", apellido: "", nacionalidad: "" })
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
              <div className="col-md-4">
                <input className="form-control" placeholder="Nombre *" value={nuevoDirector.nombre} onChange={(e)=>setNuevoDirector({...nuevoDirector, nombre:e.target.value})} required />
              </div>
              <div className="col-md-4">
                <input className="form-control" placeholder="Apellido *" value={nuevoDirector.apellido} onChange={(e)=>setNuevoDirector({...nuevoDirector, apellido:e.target.value})} required />
              </div>
              <div className="col-md-3">
                <input className="form-control" placeholder="Nacionalidad" value={nuevoDirector.nacionalidad} onChange={(e)=>setNuevoDirector({...nuevoDirector, nacionalidad:e.target.value})} />
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
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Nacionalidad</th>
                  <th>ID</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {directores.map((d, index) => (
                  <tr key={d.id || `director-${index}`}>
                    <td>
                      {directorEditando === d.id ? (
                        <input className="form-control form-control-sm" value={directorEditado.nombre} onChange={(e)=>setDirectorEditado({...directorEditado, nombre:e.target.value})} />
                      ) : d.nombre}
                    </td>
                    <td>
                      {directorEditando === d.id ? (
                        <input className="form-control form-control-sm" value={directorEditado.apellido} onChange={(e)=>setDirectorEditado({...directorEditado, apellido:e.target.value})} />
                      ) : d.apellido}
                    </td>
                    <td>
                      {directorEditando === d.id ? (
                        <input className="form-control form-control-sm" value={directorEditado.nacionalidad} onChange={(e)=>setDirectorEditado({...directorEditado, nacionalidad:e.target.value})} />
                      ) : (d.nacionalidad || '—')}
                    </td>
                    <td className="small text-muted">{d.id}</td>
                    <td className="text-end">
                      {directorEditando === d.id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={handleGuardarEdicion}>Guardar</button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={handleCancelarEdicion}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEditarDirector(d)}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={()=>handleEliminarDirector(d.id)}>Eliminar</button>
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