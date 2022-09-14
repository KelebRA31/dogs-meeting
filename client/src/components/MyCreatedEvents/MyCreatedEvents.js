import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCreatedEventsTHUNK } from '../../redux/actions/eventAction';
import './MyCreatedEvent.css';

export default function MyCreatedEvents() {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(event, 'dsadsda');
  // const { room } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getCreatedEventsTHUNK(id));
  }, []);

  const clickHandler = (mettingId) => {
    navigate(`/event/${id}/${mettingId}`);
  };
  return (
    <div className="container-createdEvents">
      {event.eventData?.map((el) => (
        <div className="mini-container-createdEvents" key={el.id} type="div" onClick={() => (clickHandler(el.id))}>
          <div>{el.User.nickName}</div>
          <div>{el.comment}</div>
          <div>{el.start.substring(11, 19)}</div>
          <div>{el.end.substring(11, 19)}</div>
        </div>
      ))}
    </div>
  );
}
