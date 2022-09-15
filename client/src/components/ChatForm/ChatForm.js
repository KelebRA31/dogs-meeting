import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Form, FormGroup, Input, Col, InputGroup, Button, Row,
} from 'reactstrap';
import { sendChatMessage } from '../../redux/actions/chatActions';
import '../chatStyles.css';

export default function ChatForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { meetingId } = useParams();

  const inputHAndler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // ws10 dispatches action to saga look step ws9
    dispatch(sendChatMessage({ message: input, meeting_id: meetingId }));
    setInput('');
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <InputGroup>
              <Input type="text" value={input} onChange={inputHAndler} />
              <Button color="success" type="submit">
                Send
              </Button>
            </InputGroup>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}
