import React, {useContext, useEffect} from 'react'
import authContext from '../../context/autenticacion/authContext'

const Barra = () => {
  //Extrae la informacion de autenticacion
  const AuthContext = useContext(authContext);
  const {usuario, usuarioAutenticado, cerrarSesion} = AuthContext;

  useEffect( () => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null }

     <nav className="nav-principal">
      <button
        className="btn btn-blank cerrar-sesion"
        onClick={() => cerrarSesion()}
        >Cerrar Sesion</button>
     </nav>
    </header>
  )
}

export default Barra
