import React from 'react';
import { ListGroupItem } from 'reactstrap';
import '../chatStyles.css';

export default function UsersItem({ user }) {
  return (
    <ListGroupItem>
      {user.name}
    </ListGroupItem>
  );
}
