import { useEffect, useState } from "react"
import { obtenerMedias } from "../../services/MediaService"

export default function Media() {
  const [medias, setMedias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    listarMedias()
  }, [])

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
        <h2 className="h4 fw-bold mb-1">🍿 Catálogo de Media</h2>
        <p className="text-muted">Lista de películas/series disponibles</p>
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
                <div key={media.id || `media-${index}`} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100">
                    {media.imagen ? (
                      <img src={media.imagen} className="card-img-top" alt={media.titulo} />
                    ) : null}
                    <div className="card-body">
                      <h5 className="card-title mb-1">{media.titulo || 'Sin título'}</h5>
                      <p className="card-text text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {media.sinopsis || 'Sin sinopsis'}
                      </p>
                      <div className="row row-cols-2 g-2 small text-muted mb-2">
                        <div className="col"><span className="badge text-bg-light w-100">Año: {media.añoEstreno ?? 'N/D'}</span></div>
                        <div className="col"><span className="badge text-bg-light w-100">Estado: {media.estado ? 'Activo' : 'Inactivo'}</span></div>
                        <div className="col"><span className="badge text-bg-light w-100">Género: {media?.generoPrincipal?.nombre || media.generoPrincipal || 'N/D'}</span></div>
                        <div className="col"><span className="badge text-bg-light w-100">Director: {media?.director?.nombre || media.director || 'N/D'}</span></div>
                      </div>
                      {media.url ? (
                        <a href={media.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                          Ver más
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

	  {/* Debug eliminado */}
    </div>
  )
}


