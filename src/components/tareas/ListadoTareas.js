import React, {Fragment, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Tarea from './Tarea'

const ListadoTareas = () => {

  //Obtener del state el listado de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {tareasproyecto} = tareasContext;

  if (!proyecto) return <h2>Selecciona un proyecto</h2>

  const [proyectoActual] = proyecto;


  return (
    <Fragment>
    <h2>Proyecto: {proyectoActual.nombre}</h2>

    <ul className="listado-tareas">
        {tareasproyecto.length === 0
            ? (<li className="tarea"><p>No hay tareas</p></li>)
            :
            <TransitionGroup>
               {
                 tareasproyecto.map(tarea => (
                   <CSSTransition
                     key={tarea.id}
                     timeout={200}
                     className="tarea"
                     >
                     <Tarea
                         tarea={tarea}
                     />
                   </CSSTransition>
                 ))
               }
            </TransitionGroup>
        }
    </ul>
    <button
      type="button"
      className="btn btn-eliminar"
      onClick={ () => eliminarProyecto(proyectoActual.id) }
      >Eliminar Proyecto &times;</button>
</Fragment>

  )
}

export default ListadoTareas
