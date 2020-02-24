import React, { useContext} from 'react'
import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'

const Tarea = ({tarea}) => {

  //Obtener del state el listado de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {eliminarTarea, obtenerTareas, cambiarEstadotarea, guardarTareaActual} = tareasContext;

  //extrae el proyecto
  const [proyectoActual] = proyecto;

  //Funcion para cambiar el estado
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    cambiarEstadotarea(tarea)
  }

  //Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea)
  }

  //Funcion que se ejecuta cuandl el usuario presina el btn de eliminar tarea
  const handleClick = id => {
    eliminarTarea(id)
    obtenerTareas(proyectoActual.id)
  }

  return (
    <li
      className="tarea sombra"
      >
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado
         ? (
            <button
              type="button"
              className="completo"
              onClick={ () => cambiarEstado(tarea)}
              >Completo</button>
           )
         : (
            <button
              type="button"
              className="incompleto"
              onClick={ () => cambiarEstado(tarea)}
              >Incompleto</button>
           )
        }
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea) }
          >Editar</button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={ () => handleClick(tarea.id)}
          >Eliminar</button>
      </div>
    </li>
  )
}

export default Tarea
