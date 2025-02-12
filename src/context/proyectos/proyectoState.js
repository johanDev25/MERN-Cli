import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import clienteAxios from '../../config/axios';

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR } from '../../types'

  const ProyectoState = props => {

    const initialState = {
      proyectos :[],
      formulario : false,
      errorformulario : false,
      proyecto : null,
      mensaje: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
      dispatch({
        type: FORMULARIO_PROYECTO
      })
    }

    //obtener los proyectos
    const obtenerProyectos = async () => {
      try {
        const resultado = await clienteAxios.get('/api/proyectos');

        dispatch({
          type: OBTENER_PROYECTOS,
          payload: resultado.data.proyectos
        })
      }  catch (e) {
        const alerta = {
          msg: 'Hubo un error',
          categoria: 'alerta-error'
        }
        dispatch({
          type: PROYECTO_ERROR,
          payload: alerta
        })
      }
    }

    //Agregar un nuevo proyecto
    const agregarProyecto = async proyecto => {
      try {
        const resultado = await clienteAxios.post('/api/proyectos', proyecto);

        dispatch({
          type: AGREGAR_PROYECTO,
          payload: resultado.data
        })
      }  catch (e) {
        const alerta = {
          msg: 'Hubo un error',
          categoria: 'alerta-error'
        }
        dispatch({
          type: PROYECTO_ERROR,
          payload: alerta
        })
      }
    }

    //Valida el formulario de proyecto
    const mostrarError = () => {
      dispatch({
        type: VALIDAR_FORMULARIO
      })
    }

    //Seleciona el proyecto al que se le dio click
    const proyectoActual = proyectoId => {
      dispatch({
        type: PROYECTO_ACTUAL,
        payload: proyectoId
      })
    }

    //Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (e) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
    }

    return (
      <proyectoContext.Provider
        value={{
          proyectos: state.proyectos,
          formulario: state.formulario,
          errorformulario: state.errorformulario,
          proyecto: state.proyecto,
          mensaje: state.mensaje,
          mostrarFormulario,
          obtenerProyectos,
          agregarProyecto,
          mostrarError,
          proyectoActual,
          eliminarProyecto
        }}
        >
        {props.children}
      </proyectoContext.Provider>

    )
  }

  export default ProyectoState;
