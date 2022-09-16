// Example

import {
  SET_DOG_IMG, GET_DOG_INFO, CREATE_DOG, DELETE_DOG, EDIT_DOG,
} from '../types/types';

export const setDogImg = (data) => ({ type: SET_DOG_IMG, payload: data });
export const getDogInfo = (data) => ({ type: GET_DOG_INFO, payload: data });
export const createDog = (data) => ({ type: CREATE_DOG, payload: data });
export const deleteDog = (data) => ({ type: DELETE_DOG, payload: data });
export const editDog = (data) => ({ type: EDIT_DOG, payload: data });

export const setDogImgTHUNK = (str) => (dispatch) => {
  fetch('http://localhost:3001/api/setdogimg', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(str),
  })
    .then((res) => res.json())
    .then((res) => dispatch(setDogImg(res)));
};

export const createDogTHUNK = (dog) => (dispatch) => {
  fetch('http://localhost:3001/api/setdogimg/createdog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog),
  })
    .then((res) => res.json())
    .then((res) => dispatch(createDog(res)));
};

export const getDogInfoTHUNK = (id) => (dispatch) => {
  fetch(`http://localhost:3001/mydogs/${id}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(getDogInfo(res));
    });
};

export const deleteDogTHUNK = (id) => (dispatch) => {
  fetch(`http://localhost:3001/mydogs/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.json());
        dispatch(deleteDog(id));
      }
    });
};

export const editDogTHUNK = (id, obj) => (dispatch) => {
  console.log('obj:', obj);
  console.log('id:', id);
  fetch(`http://localhost:3001/mydogs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        dispatch(editDog(res));
      }
    });
};
