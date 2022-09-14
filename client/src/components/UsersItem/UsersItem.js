import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default function UsersItem({ user }) {
  return (
    <ListGroupItem>
      {user.name}
    </ListGroupItem>
  );
}