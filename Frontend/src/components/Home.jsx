import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      title: 'Géneros',
      description: 'Administra los géneros de películas',
      path: '/generos',
      icon: (
        <svg width="32" height="32" className="text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: 'success'
    },
    {
      title: 'Directores',
      description: 'Gestiona la información de directores',
      path: '/directores',
      icon: (
        <svg width="32" height="32" className="text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'primary'
    },
    {
      title: 'Productoras',
      description: 'Administra las productoras de películas',
      path: '/productoras',
      icon: (
        <svg width="32" height="32" className="text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'warning'
    },
    {
      title: 'Media',
      description: 'Gestiona películas y series',
      path: '/media',
      icon: (
        <svg width="32" height="32" className="text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: 'info'
    },
    {
      title: 'Tipos',
      description: 'Administra los tipos de contenido',
      path: '/tipos',
      icon: (
        <svg width="32" height="32" className="text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2zm0 0h8m-8 0v16m8-16v16" />
        </svg>
      ),
      color: 'secondary'
    }
  ]

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container-fluid">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-4">
            🎬 Bienvenido a App Películas
          </h1>
          <p className="lead text-muted mb-4">
            Administra tu colección de películas de forma eficiente
          </p>
          <div className="alert alert-info border-0 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
            <h2 className="h5 fw-bold text-info mb-2">
              Sistema de Gestión Completo
            </h2>
            <p className="mb-0 text-info">
              Organiza géneros, directores, productoras, media y tipos para mantener tu biblioteca de películas perfectamente estructurada.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="row g-4 mb-5">
          {features.map((feature) => (
            <div key={feature.path} className="col-12 col-md-6 col-lg-4">
              <Link
                to={feature.path}
                className={`text-decoration-none card h-100 shadow-sm border-0 hover-scale ${
                  feature.color === 'success' 
                    ? 'hover:border-success' 
                    : feature.color === 'primary'
                    ? 'hover:border-primary'
                    : feature.color === 'warning'
                    ? 'hover:border-warning'
                    : feature.color === 'info'
                    ? 'hover:border-info'
                    : 'hover:border-secondary'
                }`}
                style={{ transition: 'all 0.3s ease' }}
              >
                <div className="card-body text-center p-4">
                  <div className={`d-inline-flex p-3 rounded-circle mb-3 ${
                    feature.color === 'success' 
                      ? 'bg-success bg-opacity-10' 
                      : feature.color === 'primary'
                      ? 'bg-primary bg-opacity-10'
                      : feature.color === 'warning'
                      ? 'bg-warning bg-opacity-10'
                      : feature.color === 'info'
                      ? 'bg-info bg-opacity-10'
                      : 'bg-secondary bg-opacity-10'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`h4 fw-bold mb-3 ${
                    feature.color === 'success' 
                      ? 'text-success' 
                      : feature.color === 'primary'
                      ? 'text-primary'
                      : feature.color === 'warning'
                      ? 'text-warning'
                      : feature.color === 'info'
                      ? 'text-info'
                      : 'text-secondary'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted mb-4">
                    {feature.description}
                  </p>
                  <div className={`btn btn-${feature.color} px-4 py-2`}>
                    <span>Acceder</span>
                    <svg className="w-4 h-4 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body p-4">
            <h3 className="h3 fw-bold text-dark mb-4 text-center">
              Estadísticas del Sistema
            </h3>
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                  <div className="display-6 fw-bold text-success mb-2">∞</div>
                  <div className="fw-semibold text-success">Géneros</div>
                  <div className="small text-success">Sin límite</div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="text-center p-4 bg-primary bg-opacity-10 rounded-3">
                  <div className="display-6 fw-bold text-primary mb-2">∞</div>
                  <div className="fw-semibold text-primary">Directores</div>
                  <div className="small text-primary">Sin límite</div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                  <div className="display-6 fw-bold text-warning mb-2">∞</div>
                  <div className="fw-semibold text-warning">Productoras</div>
                  <div className="small text-warning">Sin límite</div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="text-center p-4 bg-info bg-opacity-10 rounded-3">
                  <div className="display-6 fw-bold text-info mb-2">∞</div>
                  <div className="fw-semibold text-info">Media</div>
                  <div className="small text-info">Sin límite</div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="text-center p-4 bg-secondary bg-opacity-10 rounded-3">
                  <div className="display-6 fw-bold text-secondary mb-2">∞</div>
                  <div className="fw-semibold text-secondary">Tipos</div>
                  <div className="small text-secondary">Sin límite</div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="text-center p-4 bg-dark bg-opacity-10 rounded-3">
                  <div className="display-6 fw-bold text-dark mb-2">24/7</div>
                  <div className="fw-semibold text-dark">Disponibilidad</div>
                  <div className="small text-dark">Siempre activo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="h4 fw-semibold text-dark mb-4">
            Acciones Rápidas
          </h3>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link
              to="/generos"
              className="btn btn-success btn-lg d-flex align-items-center"
            >
              <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Género
            </Link>
            <Link
              to="/directores"
              className="btn btn-primary btn-lg d-flex align-items-center"
            >
              <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Director
            </Link>
            <Link
              to="/productoras"
              className="btn btn-warning btn-lg d-flex align-items-center"
            >
              <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Productora
            </Link>
            <Link
              to="/media"
              className="btn btn-info btn-lg d-flex align-items-center"
            >
              <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Media
            </Link>
            <Link
              to="/tipos"
              className="btn btn-secondary btn-lg d-flex align-items-center"
            >
              <svg width="20" height="20" className="me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Tipo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
