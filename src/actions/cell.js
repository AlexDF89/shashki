import axios from 'axios';

export const CAN_DROP = 'CAN_DROP';

export function canDrop(drop) {
  const data = [drop[0].coordinate, drop[1].coordinate];
  return dispatch => {
    return axios.post('api/canDrop', data)
      .then(response => response.data)
      .then(drop => {
        console.log(drop)
        return dispatch({
          type: CAN_DROP,
          drop
       })
      })
      .catch(err => console.error(err.message));
  }
}