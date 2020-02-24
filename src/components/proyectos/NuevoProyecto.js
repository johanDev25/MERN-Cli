import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {
  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;


  //state para el proyecto
  const [proyecto, setProyecto] = useState({
    nombre: ''
  });

  const {nombre} = proyecto;
  //lee los contenidos del imput

  const onChangeProyecto = e => {
    setProyecto({
      ...proyecto,
      [e.target.name] : e.target.value
    })
  }

  const onSubmitProyecto = e => {
    e.preventDefault()
    //validar el proyecto
    if (nombre === '') {
      mostrarError();
      return;
    }
    //Agrega al state
    agregarProyecto(proyecto);
    // Reiniciar el form
    setProyecto({
      nombre: ''
    })
  }

  const onClickFormulario = () => {
    mostrarFormulario();
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
        >Nuevo Proyecto</button>
      { formulario
        ?
        (
          <form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}
            >
            <input
              type="text"
              className="input-text"
              placeholder="Nombre Proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
              />
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar Proyecto"
              />
          </form>
        )
        :
        null
      }
      { errorformulario
      ?
      <p className="mensaje error">El nombre debe ser obligatorio</p>
      :
       null
      }
    </Fragment>

  )
}

export default NuevoProyecto
