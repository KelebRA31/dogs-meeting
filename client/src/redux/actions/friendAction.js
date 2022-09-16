import {
  ADD_FRIEND, DEL_FRIEND, GET_FRIEND,
} from '../types/types';

export const addFriend = (data) => ({ type: ADD_FRIEND, payload: data });
export const getFriend = (data) => ({ type: GET_FRIEND, payload: data });
export const deleteFriend = (data) => ({ type: DEL_FRIEND, payload: data });

export const getFriendTHUNK = () => (dispatch) => {
  fetch('http://localhost:3001/api/friend/get', {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(getFriend(res));
    });
};

export const addFriendTHUNK = (userId) => (dispatch) => {
  console.log(userId, '1111112232312312312313123123123');
  fetch('http://localhost:3001/api/friend/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId }),
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(addFriend(res));
    });
};

export const deleteFriendTHUNK = (userId) => (dispatch) => {
  fetch('http://localhost:3001/api/friend/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId }),
  })
    .then((res) => {
      if (res.status === 200) {
        // console.log('111111111>', res.json());
        dispatch(deleteFriend(userId));
      }
    });
};
