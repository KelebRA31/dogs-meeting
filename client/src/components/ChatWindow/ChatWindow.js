import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup } from 'reactstrap';
import { getChatMessages } from '../../redux/actions/chatActions';
import MessageItem from '../MessageItem/MessageItem';

export default function ChatWindow() {
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);
  const ws = useSelector((state) => state.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && ws) {
      dispatch(getChatMessages());
    }
  }, [user, ws]);

  return (
    <Row>
      <Col className="messageWindow">
        <ListGroup>
          {messages.map((el) => <MessageItem key={el.msId} message={el} />)}
        </ListGroup>
      </Col>
    </Row>
  );
}
