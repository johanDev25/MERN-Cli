import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'

import alertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {
  //extraer los valores del context
  const alertasContext = useContext(alertaContext);
  const {alerta, mostrarAlerta} = alertasContext;

  //extraer los valores del context auth
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //En caso de  q el usuario este duplicado o ta exista
  useEffect(() => {
      if(autenticado) {
          props.history.push('/');
      }

      if(mensaje) {
          mostrarAlerta(mensaje.msg, mensaje.categoria);
      }
// eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //sate para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: '',
    nombre: '',
    password: '',
    confirmar: ''
  });

  //extrae el usuario
  const {email, nombre, password, confirmar} = usuario;

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
     if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
       mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
       return;
     }
   //password minimo de 6 caracteres
    if (password.length < 6) {
       mostrarAlerta('El password debe contener minimo 6 caracteres', 'alerta-error')
       return;
    }
   //los dos password sean iguales
    if (password.trim() !== confirmar.trim()) {
      mostrarAlerta('Los passwords no coinciden', 'alerta-error')
      return;
    }
    //pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    });
  }

  return (
    <div className="form-usuario">
      { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
      <div className="contenedor-form sombra-dark">
        <h1>Crear un Cuenta</h1>
        <form
          onSubmit={onSubmit}
          >
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
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="tuNombre"
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
              <label htmlFor="confirmar">Confirmar Password</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                value={confirmar}
                placeholder="Repite tuPassword"
                onChange={onChange}
                />
            </div>
            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Registrarme"
                />
            </div>
          </form>
          <Link to={'/'} className="enlace-cuenta">Volver Iniciar Sesion</Link>
        </div>
      </div>
    )
  }

  export default NuevaCuenta
