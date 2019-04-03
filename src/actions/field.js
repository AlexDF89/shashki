import axios from 'axios';

export const GET_FIELD = 'GET_FIELD';

export function getField() {
  return dispatch => {
    return axios.get('api/getField')
      .then(response => response.data)
      .then(field => {
        console.log(field);
        return dispatch({
          type: GET_FIELD,
          field
        })
      })
      .catch(err => console.error(err.message));
  }
}