import React from 'react'

const Barra = (props) => {
  return (
    <header className="app-header">
     <p className="nombre-usuario">Hola <span>Johan Neira</span></p>
     <nav className="nav-principal">
      <a href="#!">Cerrar Sesion</a>
     </nav>
    </header>
  )
}

export default Barra
