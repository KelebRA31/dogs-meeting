import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import './App.css';
import CreateEvent from './components/CreateEvent/CreateEvent';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<CreateEvent />} />

      </Routes>
    </div>
  );
}

export default App;
