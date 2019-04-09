import axios from 'axios';

export const CAN_DROP = 'CAN_DROP';
export const HANDLE_DROP = 'HANDLE_DROP';

export function handleDrop(drop) {
  console.log(drop);
  const data = [drop[0], drop[1]];
  return dispatch => {
    return axios.post('api/handleDrop', data)
      .then(response => response.data)
      .then(drop => {
        return dispatch({
          type: CAN_DROP,
          drop
       })
      })
      .catch(err => console.error(err.message));
  }
}

export function canDrop(drop) {
  
}