import { SHOW_RULES } from '../actions';

export default function reducer(state = false, action) {

  switch (action.type) {

    case SHOW_RULES:
      return action.rules
    
    default:
      return state;

  }

}