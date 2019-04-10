import { GET_FIELD, HANDLE_DROP } from '../actions';

export default function reducer(state = {moves: [], cells: []}, action) {
  switch(action.type) {
    case GET_FIELD:
      return action.field
    
    case HANDLE_DROP:
      return action.field
      
    default:
      return state;
  }
}