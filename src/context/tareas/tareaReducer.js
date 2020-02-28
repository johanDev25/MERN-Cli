import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  LIMPIAR_TAREA
} from '../../types'

export default (state,action) => {
  switch(action.type) {
    case TAREAS_PROYECTO:
    return {
      ...state,
      tareasproyecto: action.payload
    }
    case AGREGAR_TAREA:
    return{
      ...state,
      tareasproyecto: [action.payload,...state.tareasproyecto],
      errortarea: false
    }
    case VALIDAR_TAREA:
    return{
      ...state,
      errortarea: true
    }
    case EDITAR_TAREA:
    return{
      ...state,
      tareasproyecto: state.tareasproyecto.map(tarea => tarea.id === action.payload._id ? action.payload : tarea )
    }
    case ELIMINAR_TAREA:
    return{
      ...state,
      tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
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
