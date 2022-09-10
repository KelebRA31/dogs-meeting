import { CREATE_EVENT } from '../types/types';

export const createEvent = (data) => ({ type: CREATE_EVENT, payload: data });

export const createEventTHUNK = (inputs, user_id_creator, dog_id_creator) => (dispatch) => {
  dispatch({ type: 'FETCH_EVENT' });
  fetch('http://localhost:3001/api/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(...inputs, user_id_creator, ...dog_id_creator),

  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(createEvent(res));
    });
};
