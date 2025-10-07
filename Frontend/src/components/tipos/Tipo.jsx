import { useEffect, useState } from "react"
import { obtenerTipos, crearTipo, editarTipo, eliminarTipo } from "../../services/TipoService"

export default function Tipo() {
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nuevo, setNuevo] = useState({ nombre: "", descripcion: "" })
  const [editandoId, setEditandoId] = useState(null)
  const [editado, setEditado] = useState({ nombre: "", descripcion: "" })

  const listar = async () => {
    try {
      setLoading(true)
      const res = await obtenerTipos()
      setTipos(res.data || [])
      setError(null)
    } catch (e) {
      setError("Error al cargar tipos")
      setTipos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { listar() }, [])

  const onCrear = async (e) => {
    e.preventDefault()
    const nombre = (nuevo.nombre || '').trim()
    if (!nombre) return
    await crearTipo({ nombre, descripcion: (nuevo.descripcion || '').trim() })
    setNuevo({ nombre: "", descripcion: "" })
    listar()
  }

  const onGuardar = async () => {
    const nombre = (editado.nombre || '').trim()
    if (!nombre) return
    await editarTipo(editandoId, { nombre, descripcion: (editado.descripcion || '').trim() })
    setEditandoId(null)
    setEditado({ nombre: "", descripcion: "" })
    listar()
  }

  const onEliminar = async (id) => {
    if (!window.confirm('¿Eliminar tipo?')) return
    await eliminarTipo(id)
    listar()
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-primary me-2" role="status"><span className="visually-hidden">Loading...</span></div>
        <span className="text-muted">Cargando tipos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button onClick={listar} className="btn btn-sm btn-danger ms-2">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-3">
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold mb-1">📌 Gestión de Tipos</h2>
        <p className="text-muted">Administra los tipos de contenido</p>
      </div>

      <div className="card mb-3">
        <div className="card-header bg-secondary text-white">Crear nuevo tipo</div>
        <div className="card-body">
          <form className="row g-2" onSubmit={onCrear}>
            <div className="col-sm-4">
              <input className="form-control" placeholder="Nombre *" value={nuevo.nombre} onChange={(e)=>setNuevo({...nuevo, nombre:e.target.value})} required />
            </div>
            <div className="col-sm-6">
              <input className="form-control" placeholder="Descripción" value={nuevo.descripcion} onChange={(e)=>setNuevo({...nuevo, descripcion:e.target.value})} />
            </div>
            <div className="col-sm-2 d-grid">
              <button className="btn btn-secondary" type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      {tipos.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">No hay tipos</div>
      ) : (
        <div className="card">
          <div className="card-header bg-dark text-white">Lista de Tipos ({tipos.length})</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>ID</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map((t)=> (
                  <tr key={t.id}>
                    <td>
                      {editandoId === t.id ? (
                        <input className="form-control form-control-sm" value={editado.nombre} onChange={(e)=>setEditado({...editado, nombre:e.target.value})} />
                      ) : t.nombre}
                    </td>
                    <td>
                      {editandoId === t.id ? (
                        <input className="form-control form-control-sm" value={editado.descripcion} onChange={(e)=>setEditado({...editado, descripcion:e.target.value})} />
                      ) : (t.descripcion || '—')}
                    </td>
                    <td className="small text-muted">{t.id}</td>
                    <td className="text-end">
                      {editandoId === t.id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={onGuardar}>Guardar</button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={()=>{setEditandoId(null);setEditado({ nombre:"", descripcion:"" })}}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>{setEditandoId(t.id); setEditado({ nombre: t.nombre || '', descripcion: t.descripcion || '' })}}>Editar</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={()=>onEliminar(t.id)}>Eliminar</button>
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


