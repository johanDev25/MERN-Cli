import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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
  e.preventDefatult();
  // Validar que no hayan campos vacios

}

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
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
