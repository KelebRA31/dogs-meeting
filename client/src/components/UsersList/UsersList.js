import React from 'react';
import { Col, ListGroup } from 'reactstrap';
import { useSelector } from 'react-redux';
import UsersItem from '../UsersItem/UsersItem';
import '../chatStyles.css';

export default function UsersList() {
  const chatUsers = useSelector((state) => state.chatUsers);
  return (
    <Col md="2" sm="12" className="mt-2 text-center userWrapper">
      <span className="chatUsers">Пользователи онлайн</span>
      <ListGroup className="mt-2">
        {chatUsers.map((el) => <UsersItem key={el.id} user={el} />)}
      </ListGroup>
    </Col>
  );
}
