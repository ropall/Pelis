import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Generos from './components/generos/Generos'
import Directores from './components/directores/Directores'
import Productoras from './components/productoras/Productoras'
import Media from './components/media/Media'
import Tipo from './components/tipos/Tipo'

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Navigation />
        <main className="container py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generos" element={<Generos />} />
            <Route path="/directores" element={<Directores />} />
            <Route path="/productoras" element={<Productoras />} />
            <Route path="/media" element={<Media />} />
            <Route path="/tipos" element={<Tipo />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App