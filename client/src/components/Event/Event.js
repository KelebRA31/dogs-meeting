import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogInfoTHUNK } from '../../redux/actions/dogAction';
import Profile from '../Profile/Profile';
import './Event.css';

export default function Event() {
  const auth = useSelector((state) => state.auth);
  const dog = useSelector((state) => state.dog);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogInfoTHUNK(id));
  }, []);

  console.log(dog);
  return (
    <div className="super-container-event">
      <div className="chat-event" />
      <div className="container-event">
        <div className="inner-event">
          <img src={auth?.img} width="120px" height="120px" className="img-profile-in-meeting" alt="user-img" />
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
        </div>
        <div className="container-dog-in-meeting">
          <div className="dog-profile-in-meeting">
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
          </div>
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
    </div>
  );
}
