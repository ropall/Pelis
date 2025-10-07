import { useEffect, useState } from "react"
import { obtenerProductoras, crearProductora, editarProductora, eliminarProductora } from "../../services/ProductorasService"

export default function Productoras() {
  const [productoras, setProductoras] = useState([])
  const [nuevaProductora, setNuevaProductora] = useState({ nombre: "", slogan: "", descripcion: "" })
  const [productoraEditando, setProductoraEditando] = useState(null)
  const [productoraEditada, setProductoraEditada] = useState({ nombre: "", slogan: "", descripcion: "" })
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
          descripcion: nuevaProductora.descripcion?.trim() || ""
        })
        setNuevaProductora({ nombre: "", slogan: "", descripcion: "" })
        setMostrarFormulario(false)
        listarProductoras()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleEditarProductora = (productora) => {
    setProductoraEditando(productora.id)
    setProductoraEditada({ 
      nombre: productora.nombre || "", 
      slogan: productora.slogan || "", 
      descripcion: productora.descripcion || "" 
    })
  }

  const handleGuardarEdicion = async () => {
    const nombre = productoraEditada.nombre?.trim() || ""
    
    if (nombre) {
      try {
        await editarProductora(productoraEditando, {
          nombre,
          slogan: productoraEditada.slogan?.trim() || "",
          descripcion: productoraEditada.descripcion?.trim() || ""
        })
        setProductoraEditando(null)
        setProductoraEditada({ nombre: "", slogan: "", descripcion: "" })
        listarProductoras()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCancelarEdicion = () => {
    setProductoraEditando(null)
    setProductoraEditada({ nombre: "", slogan: "", descripcion: "" })
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
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-2 text-gray-600">Cargando productoras...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-800">{error}</span>
        </div>
        <button 
          onClick={listarProductoras}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🎬 Gestión de Productoras
        </h2>
        <p className="text-gray-600">
          Administra las productoras de películas
        </p>
      </div>

      {/* Estado de los datos */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-orange-800">Estado de los Datos</h3>
            <p className="text-orange-600">
              Productoras cargadas: {productoras.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-orange-600">
              Servidor: {productoras.length > 0 ? '✅ Conectado' : '⚠️ Sin datos'}
            </p>
          </div>
        </div>
      </div>

      {/* Botón para agregar nueva productora */}
      <div className="text-center">
        <button 
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white transition-all duration-200 ${
            mostrarFormulario 
              ? 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500' 
              : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Nueva Productora'}
        </button>
      </div>

      {/* Formulario para agregar productora */}
      {mostrarFormulario && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-xl font-semibold text-white">Nueva Productora</h3>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleAgregarProductora} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Productora *
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nuevaProductora.nombre}
                  onChange={(e) => setNuevaProductora({...nuevaProductora, nombre: e.target.value})}
                  placeholder="Ej: Warner Bros, Disney, Netflix..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-2">
                  Slogan
                </label>
                <input
                  type="text"
                  id="slogan"
                  value={nuevaProductora.slogan}
                  onChange={(e) => setNuevaProductora({...nuevaProductora, slogan: e.target.value})}
                  placeholder="Ej: 'The Magic of Disney', 'Just Do It'..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  value={nuevaProductora.descripcion}
                  onChange={(e) => setNuevaProductora({...nuevaProductora, descripcion: e.target.value})}
                  placeholder="Descripción de la productora, historia, especialidades..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar Productora
                </button>
                <button 
                  type="button" 
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={() => setMostrarFormulario(false)}
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No hay productoras registradas</h3>
          <p className="text-gray-500 mb-6">
            El servidor backend no está devolviendo datos o no está ejecutándose.
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>URL del backend:</strong> http://localhost:3000</p>
            <p><strong>Endpoint:</strong> /productoras</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-orange-500 text-white px-4 py-2">
            <h3 className="font-semibold">Lista de Productoras ({productoras.length})</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productoras.map((productora, index) => (
                <div key={productora.id || `productora-${index}`} className="bg-gray-50 p-4 rounded border">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-semibold text-sm">
                        {(productora.nombre || '').charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {productora.nombre || 'Sin nombre'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {productora.slogan || 'Sin slogan'}
                      </div>
                    </div>
                  </div>
                  {productora.descripcion && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Descripción</div>
                      <div className="text-sm text-gray-700 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {productora.descripcion}
                      </div>
                    </div>
                  )}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${productora.estado ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-gray-500">{productora.estado ? 'Activo' : 'Inactivo'}</span>
                      </div>
                      <span className="text-gray-500">
                        {productora.fechaCreacion ? new Date(productora.fechaCreacion).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      ID: {productora.id}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditarProductora(productora)}
                        className="p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded"
                        title="Editar productora"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEliminarProductora(productora.id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Eliminar productora"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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

