import { GET_FIELD, HANDLE_DROP } from '../actions';

export default function reducer(state = {user: 0, field: {
		gameID: 0,
		whoseMove: 0,
		moves: [],
		cells: []
	}}, action) {

  switch(action.type) {
    case GET_FIELD:
      return action.data
    
    case HANDLE_DROP:
      return action.data
      
    default:
      return state;
	}
	
}