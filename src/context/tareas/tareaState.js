import React, {useReducer} from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import clienteAxios from '../../config/axios';

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  }

  //crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //crea las funciones
  //Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {

    try {
      const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      })
    } catch (error) {
      console.log(error);
    }
  }

  //Agregar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea)
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data
      })
    } catch (e) {
      console.log(e);
    }
  }

  //valida el formulario de tarea
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  //Extrae una tarea para edicion
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  // Edita o modifica una tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      dispatch({
        type: EDITAR_TAREA,
        payload: resultado.data.tarea
      })
    } catch (e) {
      console.log(e);
    }

  }

  //Eliminar tarea por id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
    } catch (e) {

    }
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
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        mostrarError,
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
