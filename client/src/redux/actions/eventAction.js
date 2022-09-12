import { CREATE_EVENT } from '../types/types';

export const createEvent = (data) => ({ type: CREATE_EVENT, payload: data });

export const createEventTHUNK = (inputs) => (dispatch) => {
  dispatch({ type: 'FETCH_EVENT' });
  fetch('http://localhost:3001/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(inputs),

  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(createEvent(res));
    });
};
