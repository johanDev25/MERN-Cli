import React, {useReducer} from 'react'
import tareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

import { v4 as uuidv4 } from 'uuid';

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ESTADO_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {
  const initialState = {
    tareas: [
      {id: 1, nombre: 'Eegir Plataforma', estado: true, proyectoId: 1},
      {id: 2, nombre: 'Eegir Colores', estado: false, proyectoId: 2},
      {id: 3, nombre: 'Eegir Plataformas de pago', estado: false, proyectoId: 3},
      {id: 4, nombre: 'Eegir Hosting', estado: true, proyectoId: 4},
      {id: 5, nombre: 'Eegir Plataforma', estado: true, proyectoId: 2},
      {id: 6, nombre: 'Eegir Colores', estado: false, proyectoId: 3},
      {id: 7, nombre: 'Eegir Plataformas de pago', estado: false, proyectoId: 4},
      {id: 8, nombre: 'Eegir Plataforma', estado: true, proyectoId: 3},
      {id: 9, nombre: 'Eegir Colores', estado: false, proyectoId: 2},
      {id: 10, nombre: 'Eegir Plataformas de pago', estado: false, proyectoId: 1},
    ],
    tareasproyecto: null,
    errortarea: false,
    tareaseleccionada: null
  }

  //crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //crea las funciones
  //Obtener las tareas de un proyecto
   const obtenerTareas = proyectoId => {
     dispatch({
       type: TAREAS_PROYECTO,
       payload: proyectoId
     })
   }

   //Agregar una tarea al proyecto seleccionado
   const agregarTarea = tarea => {
     tarea.id = uuidv4();
     dispatch({
       type: AGREGAR_TAREA,
       payload: tarea
     })
   }

   //valida el formulario de tarea
   const mostrarError = () => {
     dispatch({
       type: VALIDAR_TAREA
     })
   }

   //Cambia el estado de cada tarea
   const cambiarEstadotarea = tarea => {
     dispatch({
       type: ESTADO_TAREA,
       payload: tarea
     })
   }

   // Edita o modifica una tarea
   const actualizarTarea = tarea => {
       dispatch({
           type: EDITAR_TAREA,
           payload: tarea
       })
   }

   //Eliminar tarea por id
   const eliminarTarea = id => {
     dispatch({
       type: ELIMINAR_TAREA,
       payload: id
     })
   }

   //Extrae una tarea para edicion
   const guardarTareaActual = tarea => {
     dispatch({
     type: TAREA_ACTUAL,
     payload: tarea
    })
   }

   //limpiar tarea despeus de actualizar
   const limpiarTarea = () => {
     dispatch({
       type: LIMPIAR_TAREA
     })
   }

  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        mostrarError,
        cambiarEstadotarea,
        actualizarTarea,
        eliminarTarea,
        guardarTareaActual,
        limpiarTarea
      }}
      >
     {props.children}
   </tareaContext.Provider>
  )
}

export default TareaState;
