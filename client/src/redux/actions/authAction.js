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
      console.log(res);
      if (res.id) {
        dispatch(setAuth(res));
      } else {
        dispatch(setAuth({ notAuth: 'no' }));
      }
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

export const setRegistrationTHUNK = (data) => (dispatch) => {
  fetch('http://localhost:3001/api/auth/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    // body: JSON.stringify({ ...inputs, gender_id }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.id) {
        dispatch(setAuth(res));
        dispatch(checkAuthTHUNK());
      } else {
        dispatch(setAuth({ err: 'Данные для регистрации неверны' }));
      }
    });
};
