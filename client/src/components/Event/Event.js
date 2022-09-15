import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Row } from 'reactstrap';
import { getDogInfoTHUNK } from '../../redux/actions/dogAction';
import DogCard from '../DogCard/DogCard';
import Profile from '../Profile/Profile';
import './Event.css';
import { getEventInfoTHUNK, getEventTHUNK } from '../../redux/actions/eventAction';
import UsersList from '../UsersList/UsersList';
import ChatWrapper from '../ChatWrapper/ChatWrapper';
import '../chatStyles.css';

export default function Event() {
  const [currentEvent, setCurrentEvent] = useState({});
  const auth = useSelector((state) => state.auth);
  const dog = useSelector((state) => state.dog);
  const user = useSelector((state) => state.user);
  const event = useSelector((state) => state.event);
  const { id, meetingId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventTHUNK());
    // dispatch(getDogInfoTHUNK(auth?.id));
  }, []);

  useEffect(() => {
    setCurrentEvent(event.eventData.filter((el) => el.id === +meetingId));
  }, [event]);

  // console.log(event.eventData[0].User);

  return (
    <div className="super-container-event">
      <div className="chat-event">
        <div className="info-of-meeting">
          <div className="container-key-in-meeting">
            <div className="key-container">
              <div className="key-in-meeting">
                Комментарий:
              </div>
              <div className="value-in-meeting">
                {currentEvent[0]?.comment}
              </div>
            </div>
            <div className="key-container">
              <div className="key-in-meeting">
                Ник админа прогулки:
              </div>
              <div className="value-in-meeting">
                {currentEvent[0]?.User.nickName}
              </div>
            </div>
            <div className="key-container">
              <div className="key-in-meeting">
                Время начала:
              </div>
              <div className="value-in-meeting">
                {currentEvent[0]?.start.substring(11, 20)}
              </div>
            </div>
            <div className="key-container">
              <div className="key-in-meeting">
                Время окончания:
              </div>
              <div className="value-in-meeting">
                {currentEvent[0]?.end.substring(11, 20)}
              </div>
            </div>
          </div>
          {/* <div className="container-value-in-meeting">
          </div> */}
        </div>
        <div className="chat-of-meeting">
          <Row>
            <UsersList />
            <ChatWrapper />
          </Row>
        </div>

      </div>
      <div className="container-event">
        <div className="inner-event">
          <img src={auth?.img} width="100px" height="100px" className="img-profile-in-meeting" alt="user-img" />
          <div className="Name-in-event">Пользователь</div>
          <div className="text-event">
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Имя:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.name}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Ник:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.nickName}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Возраст:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.age}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Пол:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.gender_id === 1 ? 'Мужчина' : 'Женщина'}
              </div>
            </h6>
          </div>
        </div>
        <Carousel>
          {/* <div className="container-dog-in-meeting"> */}
          {dog?.map((item) => (
            <div key={item.id} className="container-dog-in-meeting">
              <DogCard key={item.id} item={item} />
            </div>
          ))}

        </Carousel>

        {/* <div className="dog-profile-in-meeting_2">
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Имя:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.name}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Ник:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.nickName}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Возраст:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.age}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Пол:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.Gender?.gender === 1 ? 'Мужчина' : 'Женщина'}
              </div>
            </h6>
          </div> */}

      </div>
    </div>
  );
}
