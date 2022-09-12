import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
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
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/registration" element={<Registration auth={auth} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/mydogs/:id" element={<MyDogs />} />
        <Route path="/myfriends/:id" element={<MyFriends />} />
      </Routes>
    </div>
  );
}

export default App;
