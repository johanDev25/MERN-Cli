import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import alertaContext from '../../context/alertas/alertaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadiProyectos = () => {
  //Obtener del state el listado de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos} = proyectosContext;

  //Obtener del state el listado de proyectos
  const AlertaContext = useContext(alertaContext);
  const {alerta, mostrarAlerta} = AlertaContext;

  //Obtiene proyectos cuando carga el componente
  useEffect( () => {
    //si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
   obtenerProyectos();
   // eslint-disable-next-line
  }, [mensaje])

  //para que no marque error cuando no hayan registros
  if(proyectos.length === 0 ) return <p>No hay proyectos comienza creando uno</p>;

  return (
     <ul className="listado-proyectos">
       {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

       <TransitionGroup>
         {proyectos.map(proyecto => (
           <CSSTransition
             key={proyecto._id}
             timeout={200}
             className="proyecto"
             >
             <Proyecto
               proyecto={proyecto}
             />
           </CSSTransition>
         ))}
       </TransitionGroup>

    </ul>
  )
}

export default ListadiProyectos
