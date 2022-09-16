import {
  ADD_USER_EVENT, REMOVE_USER_EVENT, GET_USER_EVENT,
} from '../types/types';

export const addUserEvent = (data) => ({ type: ADD_USER_EVENT, payload: data });
export const removeUserEvent = (data) => ({ type: REMOVE_USER_EVENT, payload: data });
export const getUserEvent = (data) => ({ type: GET_USER_EVENT, payload: data });

export const addUserEventTHUNK = (user_id, meeting_id) => (dispatch) => {
  fetch('http://localhost:3001/api/event/addUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ user_id, meeting_id }),

  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(addUserEvent(res));
    });
};

export const getUserEventTHUNK = (meetingId) => (dispatch) => {
  fetch(`http://localhost:3001/api/event/getUserEvent/${meetingId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch(getUserEvent(res));
    });
};
