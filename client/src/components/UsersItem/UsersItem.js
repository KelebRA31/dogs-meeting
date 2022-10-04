/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { ListGroupItem } from 'reactstrap';
import '../chatStyles.css';
import { useDispatch } from 'react-redux';
import { getUserInfoTHUNK } from '../../redux/actions/userAction';
import { getDogInfoTHUNK } from '../../redux/actions/dogAction';

export default function UsersItem({ user }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem>
      <p onClick={() => {
        dispatch(getUserInfoTHUNK(user.id));
        dispatch(getDogInfoTHUNK(user.id));
      }}
      >
        {user.name}
        {/* <button type="button">Подписаться</button> */}
      </p>
    </ListGroupItem>
  );
}
