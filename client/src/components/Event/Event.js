/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Row } from 'reactstrap';
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDogInfoTHUNK } from '../../redux/actions/dogAction';
import DogCard from '../DogCard/DogCard';
import Profile from '../Profile/Profile';
import './Event.css';
import { getEventInfoTHUNK, getEventTHUNK } from '../../redux/actions/eventAction';
import UsersList from '../UsersList/UsersList';
import ChatWrapper from '../ChatWrapper/ChatWrapper';
import '../chatStyles.css';
import { getUserInfoTHUNK } from '../../redux/actions/userAction';
import { addFriendTHUNK, deleteFriendTHUNK, getFriendTHUNK } from '../../redux/actions/friendAction';
import { addUserEventTHUNK, getUserEventTHUNK } from '../../redux/actions/usersMeetingAction';

export default function Event() {
  const [currentEvent, setCurrentEvent] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dog = useSelector((state) => state.dog);
  const user = useSelector((state) => state.user);
  const user1 = useSelector((state) => state.user1);
  const friend = useSelector((state) => state.friend);
  const usersMeeting = useSelector((state) => state.usersMeeting);
  const event = useSelector((state) => state.event);
  const { id, meetingId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventTHUNK());
    // dispatch(getFriendTHUNK());
    // dispatch(getFriendTHUNK());
    // dispatch(getDogInfoTHUNK(auth?.id));
    dispatch(getUserEventTHUNK(meetingId));
  }, [usersMeeting.length]);
  console.log('ggg ', usersMeeting);
  useEffect(() => {
    if (friend.filter((el) => el.friend2 === user1.id).length) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [user1]);

  // useEffect(() => {
  //   setUserState(auth);
  // }, []);

  const enterEvent = () => {
    dispatch(addUserEventTHUNK(auth.id, meetingId));
  };

  const passwordCheck = (e) => {
    if (e.target.value === event.eventData.filter((el) => el.id === +meetingId)[0].password) {
      dispatch(addUserEventTHUNK(auth?.id, meetingId));
    }
  };

  useEffect(() => {
    setCurrentEvent(event.eventData.filter((el) => el.id === +meetingId));
  }, [event]);
  console.log(event.eventData.filter((el) => el.id === +meetingId));

  // console.log(event.eventData[0].User);

  const addFriend = () => {
    dispatch(addFriendTHUNK(user1?.id));
    setIsClicked(true);
  };

  const deleteFriend = () => {
    dispatch(deleteFriendTHUNK(user1?.id));
    setIsClicked(false);
  };

  console.log(friend, '???????????????? ??????');

  return (
    <div className="super-container-event">
      <div className="chat-event">
        {!(usersMeeting?.filter((el) => el?.user_id === auth?.id).length) && auth && (
          <div className="chat-btn">
            {' '}
            {event.eventData.filter((el) => el.id === +meetingId)[0]?.password
              ? (
                <div className="mb-3">
                  <p>?????????????? ???????????? ???? ??????????????:</p>
                  <input
                    name="password"
                      // value={inputValue.password}
                      // onChange={changeHandler}
                    type="password"
                    onChange={passwordCheck}
                  />
                </div>
              )
              : (
                <Button variant="contained" disableElevation onClick={enterEvent}>
                  ???????????????????????????? ?? ????????????????
                </Button>
              ) }
          </div>

        )}
        {auth && usersMeeting?.filter((el) => el?.user_id === auth?.id).length ? (
          <>
            <div className="info-of-meeting">
              <div className="container-key-in-meeting">
                <div className="key-container">
                  <div className="key-in-meeting">
                    ??????????????????????:
                  </div>
                  <div className="value-in-meeting">
                    {currentEvent[0]?.comment}
                  </div>
                </div>
                <div className="key-container">
                  <div className="key-in-meeting">
                    ?????? ???????????? ????????????????:
                  </div>
                  <div className="value-in-meeting">
                    {currentEvent[0]?.User.nickName}
                  </div>
                </div>
                <div className="key-container">
                  <div className="key-in-meeting">
                    ?????????? ????????????:
                  </div>
                  <div className="value-in-meeting">
                    {(Number(currentEvent[0]?.start.substring(11, 13)) + 3)
                    + currentEvent[0]?.start.substring(13, 20)}
                  </div>
                </div>
                <div className="key-container">
                  <div className="key-in-meeting">
                    ?????????? ??????????????????:
                  </div>
                  <div className="value-in-meeting">
                    {(Number(currentEvent[0]?.end.substring(11, 13)) + 3)
                    + currentEvent[0]?.end.substring(13, 20)}
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
          </>
        ) : (!auth
        && <h1>?????????????????????????????????? ?????? ?????????????? ?? ??????????????, ?????????? ???????????????????????????? ?? ????????????????</h1>)}

      </div>
      {auth && (
      <div className="container-event">
        <div className="inner-event">
          {auth.id !== user1?.id && (
          <Stack spacing={2} direction="row">
            {isClicked === false
              ? <Button onClick={addFriend} className="button-event" variant="outlined" color="success">??????????????????????</Button>
              : <Button onClick={deleteFriend} className="button-event" variant="outlined">????????????????????</Button>}
          </Stack>
          )}
          <img src={user1?.img} width="100px" height="100px" className="img-profile-in-meeting" alt="user-img" />
          <div className="Name-in-event">????????????????????????</div>
          <div className="text-event">
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????:
              </div>
              <div className="text-body-profile-in-meeting">
                {user1?.name}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????:
              </div>
              <div className="text-body-profile-in-meeting">
                {user1?.nickName}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????????????:
              </div>
              <div className="text-body-profile-in-meeting">
                {user1?.age}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????:
              </div>
              <div className="text-body-profile-in-meeting">
                {user1?.gender_id === 1 ? '??????????????' : '??????????????'}
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
                ??????:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.name}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.nickName}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????????????:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.age}
              </div>
            </h6>
            <h6 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                ??????:
              </div>
              <div className="text-body-profile-in-meeting">
                {auth?.Gender?.gender === 1 ? '??????????????' : '??????????????'}
              </div>
            </h6>
          </div> */}

      </div>
      ) }
    </div>
  );
}
