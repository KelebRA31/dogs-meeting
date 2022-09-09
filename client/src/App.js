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
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
