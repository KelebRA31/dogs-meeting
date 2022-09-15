import {
  CREATE_EVENT, EVENT_FILTER, GET_EVENT, GET_CREATED_EVENTS, GET_EVENT_INFO,
} from '../types/types';

export const createEvent = (data) => ({ type: CREATE_EVENT, payload: data });
export const getEvent = (data) => ({ type: GET_EVENT, payload: data });
export const getEventInfo = (data) => ({ type: GET_EVENT_INFO, payload: data });
export const getCreatedEvents = (data) => ({ type: GET_CREATED_EVENTS, payload: data });
export const eventFilter = (data) => ({ type: EVENT_FILTER, payload: data });

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

export const getEventTHUNK = () => (dispatch) => {
  fetch('http://localhost:3001/api/event')
    .then((res) => res.json())
    .then((res) => {
      dispatch(getEvent(res));
    });
};

export const getCreatedEventsTHUNK = (id) => (dispatch) => {
  fetch(`http://localhost:3001/api/mycreatedevents/${id}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(getCreatedEvents(res));
    });
};

export const getEventInfoTHUNK = (meetingId) => (dispatch) => {
  fetch(`http://localhost:3001/api/event$/${meetingId}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(getEventInfo(res));
    });
};
