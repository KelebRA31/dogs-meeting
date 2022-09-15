import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Row } from 'reactstrap';
import { getDogInfoTHUNK } from '../../redux/actions/dogAction';
import DogCard from '../DogCard/DogCard';
import Profile from '../Profile/Profile';
import './Event.css';
import UsersList from '../UsersList/UsersList';
import ChatWrapper from '../ChatWrapper/ChatWrapper';
import '../chatStyles.css';

export default function Event() {
  const auth = useSelector((state) => state.auth);
  const dog = useSelector((state) => state.dog);
  const user = useSelector((state) => state.user);
  const { id, meetingId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogInfoTHUNK(id));
  }, []);

  return (
    <div className="super-container-event">
      <div className="chat-event">
        <Row>
          <UsersList />
          <ChatWrapper />
        </Row>
      </div>
      <div className="container-event">
        <div className="inner-event">
          <img src={auth?.img} width="100px" height="100px" className="img-profile-in-meeting" alt="user-img" />
          <h7 className="line-profile-in-meeting text-profile-in-meeting">
            <div className="text-title-profile-in-meeting">
              Имя:
            </div>
            <div className="text-body-profile-in-meeting">
              {auth?.name}
            </div>
          </h7>
          <h7 className="line-profile-in-meeting text-profile-in-meeting">
            <div className="text-title-profile-in-meeting">
              Ник:
            </div>
            <div className="text-body-profile-in-meeting">
              {auth?.nickName}
            </div>
          </h7>
          <h7 className="line-profile-in-meeting text-profile-in-meeting">
            <div className="text-title-profile-in-meeting">
              Возраст:
            </div>
            <div className="text-body-profile-in-meeting">
              {auth?.age}
            </div>
          </h7>
          <h7 className="line-profile-in-meeting text-profile-in-meeting">
            <div className="text-title-profile-in-meeting">
              Пол:
            </div>
            <div className="text-body-profile-in-meeting">
              {auth?.gender_id === 1 ? 'Мужчина' : 'Женщина'}
            </div>
          </h7>
        </div>
        <Carousel>
          {/* <div className="container-dog-in-meeting"> */}
          {dog?.map((item) => (
            <div className="container-dog-in-meeting">
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
