import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import authContext from '../../context/autenticacion/authContext'

const Proyectos = () => {
//Extrae la informacion de autenticacion
const AuthContext = useContext(authContext);
const {usuarioAutenticado} = AuthContext;

useEffect( () => {
  usuarioAutenticado();
  // eslint-disable-next-line
}, [] )

  return (
    <div className="contenedor-app">
      <Sidebar />
     <div className="seccion-principal">
       <Barra />
      <main>
        <FormTarea />
        <div className="contenedor-tareas">
         <ListadoTareas />
        </div>
      </main>
     </div>
    </div>
  )
}

export default Proyectos
