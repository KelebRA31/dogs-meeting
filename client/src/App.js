import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import { checkAuthTHUNK } from './redux/actions/authAction';

import './App.css';

import MyDogs from './components/MyDogs/MyDogs';
import MyFriends from './components/MyFriends/MyFriends';
import Event from './components/Event/Event';
import MyCreatedEvents from './components/MyCreatedEvents/MyCreatedEvents';
import MyEvents from './components/MyEvents/MyEvents';
import { getUserInfoTHUNK } from './redux/actions/userAction';
import { socketInit } from './redux/actions/wsActions';
import { userCheck } from './redux/actions/userActions';

function App() {
  const auth = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // ws1 initialize in saga
    if (user.id) {
      dispatch(socketInit());
    }
  }, [user]);

  useEffect(() => {
    dispatch(userCheck());
  }, []);
  // useEffect(() => {
  //   fetch('http://localhost:3001/auth', {
  //     credentials: 'include',
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       dispatch(setAuth(res));
  //     });
  // }, []);

  useEffect(() => {
    dispatch(checkAuthTHUNK());
    // if (auth) {
    //   dispatch(getUserInfoTHUNK(auth.id));
    // }
  }, [avatar, isEdit]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/registration" element={<Registration auth={auth} />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/event/:id/:meetingId" element={<Event />} />
        <Route path="/mycreatedevents/:id" element={<MyCreatedEvents />} />
        <Route path="/myevents/:id" element={<MyEvents />} />
        <Route path="/profile/:id" element={<Profile avatar={avatar} setAvatar={setAvatar} isEdit={isEdit} setIsEdit={setIsEdit} />} />
        <Route path="/mydogs/:id" element={<MyDogs />} />
        <Route path="/myfriends/:id" element={<MyFriends />} />

      </Routes>
    </div>
  );
}

export default App;
