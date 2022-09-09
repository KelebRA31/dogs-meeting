// Example

// import { LOGOUT, SET_AUTH } from '../types/types';

// export const setAuth = (data) => ({ type: SET_AUTH, payload: data });
// export const logout = () => ({ type: LOGOUT });

import { LOGOUT, SET_AUTH } from '../types/types';

export const setAuth = (data) => ({ type: SET_AUTH, payload: data });
export const logout = () => ({ type: LOGOUT });

export const checkAuthTHUNK = () => (dispatch) => {
  fetch('http://localhost:3001/api/auth/check', {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(setAuth(res));
    });
};

export const logoutTHUNK = () => (dispatch) => {
  fetch('http://localhost:3001/api/auth/logout', { credentials: 'include' })
    .then((res) => {
      if (res.status === 200) {
        dispatch(logout());
      }
    });
};

export const setAuthTHUNK = (inputs) => (dispatch) => {
  fetch('http://localhost:3001/api/auth/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(inputs),
  })
    .then((res) => res.json())
    .then((res) => {
      // name && id
      dispatch(setAuth(res));
    });
};

export const setRegistrationTHUNK = (inputs, gender_id) => (dispatch) => {
  fetch('http://localhost:3001/api/auth/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ ...inputs, gender_id }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        dispatch(setAuth(res));
      } else {
        dispatch(setAuth({ err: 'Данные для регистрации неверны' }));
      }
    });
};
