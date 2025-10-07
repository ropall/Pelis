import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      title: 'Géneros',
      description: 'Administra los géneros de películas',
      path: '/generos',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'Directores',
      description: 'Gestiona la información de directores',
      path: '/directores',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'purple'
    },
    {
      title: 'Productoras',
      description: 'Administra las productoras de películas',
      path: '/productoras',
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎬 Bienvenido a App Películas
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Administra tu colección de películas de forma eficiente
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Sistema de Gestión Completo
            </h2>
            <p className="text-blue-600">
              Organiza géneros y directores para mantener tu biblioteca de películas perfectamente estructurada.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className={`group bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                feature.color === 'green' 
                  ? 'hover:border-green-300' 
                  : 'hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full mb-4 ${
                  feature.color === 'green' 
                    ? 'bg-green-100 group-hover:bg-green-200' 
                    : 'bg-purple-100 group-hover:bg-purple-200'
                } transition-colors duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  feature.color === 'green' 
                    ? 'text-green-800' 
                    : 'text-purple-800'
                }`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                  feature.color === 'green'
                    ? 'bg-green-600 text-white group-hover:bg-green-700'
                    : 'bg-purple-600 text-white group-hover:bg-purple-700'
                } transition-colors duration-300`}>
                  <span>Acceder</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Estadísticas del Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
              <div className="text-green-800 font-semibold">Géneros</div>
              <div className="text-green-600 text-sm">Sin límite</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-purple-800 font-semibold">Directores</div>
              <div className="text-purple-600 text-sm">Sin límite</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
              <div className="text-orange-800 font-semibold">Productoras</div>
              <div className="text-orange-600 text-sm">Sin límite</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-blue-800 font-semibold">Disponibilidad</div>
              <div className="text-blue-600 text-sm">Siempre activo</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Acciones Rápidas
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/generos"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Género
            </Link>
            <Link
              to="/directores"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Director
            </Link>
            <Link
              to="/productoras"
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Productora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
