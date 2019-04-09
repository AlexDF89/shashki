import { GET_FIELD } from '../actions';

export default function reducer(state = {moves: [], cells: []}, action) {
  switch(action.type) {
    case GET_FIELD:
      return action.field
      
    default:
      return state;
  }
}