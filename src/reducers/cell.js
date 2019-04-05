import { CAN_DROP } from '../actions';

export default function reducer(state = {}, action) {
  switch(action.type) {
    case CAN_DROP:
      return action.drop;
    default:
      return state;
  }
}