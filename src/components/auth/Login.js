import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'

import alertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

  //extraer los valores del context
  const alertasContext = useContext(alertaContext);
  const {alerta, mostrarAlerta} = alertasContext;

  //extraer los valores del context auth
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso de  q el password o usuario no exista
  useEffect(() => {
      if(autenticado) {
          props.history.push('/proyectos');
      }

      if(mensaje) {
          mostrarAlerta(mensaje.msg, mensaje.categoria);
      }
  // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

//sate para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

//extrae el usuario
  const {email, password} = usuario;

//caputa lo que el usuario escribe
 const onChange = e => {
  setUsuario({
    ...usuario,
    [e.target.name] : e.target.value
  })
 }

//Cuando el usuario quiere iniciar sesion
const onSubmit = e => {
  e.preventDefault();
  // Validar que no hayan campos vacios
  if (email.trim() === '' || password.trim() === '' ) {
    mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    return;
  }

  iniciarSesion({
    email,
    password
  })
}

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form
          onSubmit={onSubmit}
          >
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
             type="email"
             id="email"
             name="email"
             value={email}
             placeholder="tuEmail"
             onChange={onChange}
              />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
             type="password"
             id="password"
             name="password"
             value={password}
             placeholder="tuPassword"
             onChange={onChange}
              />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
              />
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">Obtener Cuenta</Link>
      </div>
    </div>
  )
}

export default Login
