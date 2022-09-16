/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { delEventTHUNK, getCreatedEventsTHUNK } from '../../redux/actions/eventAction';
import './MyOpenEvent.css';
import { getEventUserTHUNK } from '../../redux/actions/usersMeetingAction';

export default function MyOpenEvents() {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state);
  const usersMeeting = useSelector((state) => state.usersMeeting);
  const { id } = useParams();
  const navigate = useNavigate();
  // const { room } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEventUserTHUNK(id));
  }, []);
  console.log('rrrrrrrrr', usersMeeting);
  const deleteHandler = (e, meetingId) => {
    e.stopPropagation();
    dispatch(delEventTHUNK(id, meetingId));
    // navigate('/');
  };

  const clickHandler = (userId, mettingId) => {
    navigate(`/event/${userId}/${mettingId}`);
  };
  return (
    <div className="super-container-createdEvents">
      <div className="title-container-createdEvents">Прогулки</div>
      <div className="background-line-createdEvents" />
      <div className="container-createdEvents">
        {usersMeeting?.map((el) => (
          <div className="mini-container-createdEvents" key={el?.Meeting?.id} type="div" onClick={() => (clickHandler(el?.Meeting?.user_id_creator, el?.Meeting?.id))}>
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
                <div className="value-container-createdEvents">{el?.Meeting?.comment}</div>
              </div>
              <div>
                <div className="key-container-createdEvents">Время начала:</div>
                <div className="value-container-createdEvents">{Number(el?.Meeting?.start?.substring(11, 13)) + 3 + el?.Meeting?.start?.substring(13, 19)}</div>
              </div>
              <div>
                <div className="key-container-createdEvents">Время окончания:</div>
                <div className="value-container-createdEvents">{Number(el?.Meeting?.end?.substring(11, 13)) + 3 + el?.Meeting?.end?.substring(13, 19)}</div>
              </div>
              {/* <div onClick={(e) => deleteHandler(e, el?.id)}>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </div> */}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
