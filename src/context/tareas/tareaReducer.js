import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  EDITAR_TAREA,
  ESTADO_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  LIMPIAR_TAREA
} from '../../types'

export default (state,action) => {
  switch(action.type) {
    case TAREAS_PROYECTO:
    return {
      ...state,
      tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
    }
    case AGREGAR_TAREA:
    return{
      ...state,
      tareas: [action.payload,...state.tareas],
      errortarea: false
    }
    case VALIDAR_TAREA:
    return{
      ...state,
      errortarea: true
    }
    case EDITAR_TAREA:
    case ESTADO_TAREA:
    return{
      ...state,
      tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea )
    }
    case ELIMINAR_TAREA:
    return{
      ...state,
      tareas: state.tareas.filter(tarea => tarea.id !== action.payload)
    }
    case TAREA_ACTUAL:
    return{
      ...state,
      tareaseleccionada: action.payload
    }
    case LIMPIAR_TAREA:
    return{
      ...state,
      tareaseleccionada: null
    };

    default:
    return state;
  }
}
