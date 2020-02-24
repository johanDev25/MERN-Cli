import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadiProyectos = () => {
  //Obtener del state el listado de proyectos
  const proyectosContext = useContext(proyectoContext);
  const {proyectos, obtenerProyectos} = proyectosContext;

  //Obtiene proyectos cuando carga el componente
  useEffect( () => {
   obtenerProyectos();
   // eslint-disable-next-line
  }, [])

  //para que no marque error cuando no hayan registros
  if(proyectos.length === 0 ) return <p>No hay proyectos comienza creando uno</p>;

  return (
     <ul className="listado-proyectos">
       <TransitionGroup>
         {proyectos.map(proyecto => (
           <CSSTransition
             key={proyecto.id}
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
