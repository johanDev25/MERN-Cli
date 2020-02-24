import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

  //Obtener del state el listado de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {tareaseleccionada, errortarea, agregarTarea, mostrarError, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

  //Effect que detecta si hay una tarea seleccioanda
  useEffect( () => {
    if (tareaseleccionada !== null) {
       setTarea(tareaseleccionada)
    }else {
      setTarea({
        nombre: ''
      })
    }
  }, [  tareaseleccionada])

  //state para el proyecto
  const [tarea, setTarea] = useState({
    nombre: ''
  });

  //extrae el nombre de tarea
  const {nombre} = tarea;

  //Si no hay proyecto seleccionado
  if (!proyecto) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer los valores del formulario
  const handleChange = e => {
    setTarea({
      ...tarea,
      [e.target.name] : e.target.value
    })
  }


  const onSubmit = e => {
    e.preventDefault();

    //validar
    if (nombre.trim() === '') {
      mostrarError();
      return;
    }

    // Si es edición o si es nueva tarea
        if(tareaseleccionada === null ) {
            // agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);
            //Elimina tarea seleccionada
            limpiarTarea();
        }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id)

    //reinicia el form
    setTarea({
      nombre: ''
    })
  }

  return (
    <div className="formulario">
     <form
      onSubmit={onSubmit}
       >
      <div className="contenedor-input">
       <input
        type="text"
        className="input-text"
        placeholder="Nombre Tarea..."
        name="nombre"
        value={nombre}
        onChange={handleChange}
         />
      </div>
      <div className="contenedor-input">
       <input
        type="submit"
        className="btn btn-primario btn-block"
        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
         />
      </div>
     </form>
     {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  )
}

export default FormTarea
