import { HANDLE_DROP } from '../actions';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case HANDLE_DROP:
      return action.data;
    default:
      return state;
  }
}