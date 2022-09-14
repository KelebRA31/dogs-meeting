import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default function MessageItem({ message }) {
  return (
    <ListGroupItem className="mt-1">
      {message.name}
      {' '}
      :
      {' '}
      {message.message}
    </ListGroupItem>
  );
}
