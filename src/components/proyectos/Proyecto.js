import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) => {

  //Obtener del state el listado de proyectos
  const proyectosContext = useContext(proyectoContext);
  const {proyectoActual} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {obtenerTareas} = tareasContext;

  const seleccionarProyecto = id => {
    proyectoActual(id); //Fija un proyecto actual
    obtenerTareas(id); //Filtrar las tareas cuando se de click
  }

  return (
    <li>
     <button
       type="button"
       className="btn btn-blank"
       onClick={ () => seleccionarProyecto(proyecto._id)}
       >{proyecto.nombre}
     </button>
    </li>
  )
}

export default Proyecto
