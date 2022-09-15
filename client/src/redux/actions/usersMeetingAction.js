import {
  ADD_USER_EVENT, REMOVE_USER_EVENT,
} from '../types/types';

export const addUserEvent = (data) => ({ type: ADD_USER_EVENT, payload: data });
export const removeUserEvent = (data) => ({ type: REMOVE_USER_EVENT, payload: data });

export const addUserEventTHUNK = (inputs) => (dispatch) => {
  dispatch({ type: 'FETCH_EVENT' });
  fetch('http://localhost:3001/api/event/addUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(inputs),

  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(addUserEvent(res));
    });
};
