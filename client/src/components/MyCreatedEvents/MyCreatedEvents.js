/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { delEventTHUNK, getCreatedEventsTHUNK } from '../../redux/actions/eventAction';
import './MyCreatedEvent.css';

export default function MyCreatedEvents() {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();
  // const { room } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getCreatedEventsTHUNK(id));
  }, []);
  const deleteHandler = (meetingId) => {
    dispatch(delEventTHUNK(id, meetingId));
    navigate('/');
  };

  const clickHandler = (mettingId) => {
    navigate(`/event/${id}/${mettingId}`);
  };
  return (
    <div className="super-container-createdEvents">
      <div className="title-container-createdEvents">Прогулки</div>
      <div className="background-line-createdEvents" />
      <div className="container-createdEvents">
        {event?.eventData?.map((el) => (
          <div className="mini-container-createdEvents" key={el.id} type="div" onClick={() => (clickHandler(el?.id))}>
            <div className="key-value-container">
              <div>
                <div className="key-container-createdEvents">
                  Ник создателя:
                </div>
                <div className="value-container-createdEvents">
                  {el?.User?.nickName}
                </div>
              </div>
              <div>
                <div className="key-container-createdEvents">Комментарий:</div>
                <div className="value-container-createdEvents">{el?.comment}</div>
              </div>
              <div>
                <div className="key-container-createdEvents">Время начала:</div>
                <div className="value-container-createdEvents">{Number(el?.start?.substring(11, 13)) + 3 + el?.start?.substring(13, 19)}</div>
              </div>
              <div>
                <div className="key-container-createdEvents">Время окончания:</div>
                <div className="value-container-createdEvents">{Number(el?.end?.substring(11, 13)) + 3 + el?.end?.substring(13, 19)}</div>
              </div>
              <div onClick={() => deleteHandler(el?.id)}>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
