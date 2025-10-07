import { useEffect, useState } from "react"
import { obtenerGeneros, crearGenero, editarGenero, eliminarGenero } from "../../services/GeneroService"

export default function Generos() {
  const [generos, setGeneros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nuevo, setNuevo] = useState({ nombre: "" })
  const [editandoId, setEditandoId] = useState(null)
  const [editado, setEditado] = useState({ nombre: "" })

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
    if (!nombre) return
    try {
      await crearGenero({ nombre })
      setNuevo({ nombre: "" })
      listarGeneros()
    } catch (e) {
      setError("No se pudo crear el género")
    }
  }

  const onGuardar = async () => {
    const nombre = (editado.nombre || '').trim()
    if (!nombre) return
    try {
      await editarGenero(editandoId, { nombre })
      setEditandoId(null)
      setEditado({ nombre: "" })
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
          <form className="row g-2" onSubmit={onCrear}>
            <div className="col-sm-10">
              <input className="form-control" placeholder="Nombre del género *" value={nuevo.nombre} onChange={(e)=>setNuevo({ nombre: e.target.value })} required />
            </div>
            <div className="col-sm-2 d-grid">
              <button className="btn btn-success" type="submit">Guardar</button>
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
                  <th>ID</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {generos.map((g, index) => (
                  <tr key={g.id || `genero-${index}`}>
                    <td>
                      {editandoId === g.id ? (
                        <input className="form-control form-control-sm" value={editado.nombre} onChange={(e)=>setEditado({ nombre: e.target.value })} />
                      ) : g.nombre}
                    </td>
                    <td className="small text-muted">{g.id}</td>
                    <td className="text-end">
                      {editandoId === g.id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={onGuardar}>Guardar</button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={()=>{setEditandoId(null); setEditado({ nombre: "" })}}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>{setEditandoId(g.id); setEditado({ nombre: g.nombre || '' })}}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={()=>onEliminar(g.id)}>Eliminar</button>
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