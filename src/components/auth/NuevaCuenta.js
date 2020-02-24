import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const NuevaCuenta = () => {
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
    e.preventDefatult();
    // Validar que no hayan campos vacios

   //password minimo de 6 caracteres

   //los dos password sean iguales

    //pasarlo al action

  }

  return (
    <div className="form-usuario">
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
