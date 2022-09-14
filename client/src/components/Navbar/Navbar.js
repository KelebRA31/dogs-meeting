import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { checkAuthTHUNK, logoutTHUNK } from '../../redux/actions/authAction';
import './Navbar.css';

export default function Navbar() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkAuthTHUNK());
  }, []);

  return (
    <nav className=" navbar-expand-lg color-Navbar shade-Navbar" id="container-Navbar">
      <div className="container-fluid " id="container-Navbar">
        <div className="logo-Navbar">
          <NavLink to="/" className="logo-color-Navbar"><img className="logo-circle-Navbar" src="/Images/DogsWalk.png" width="40px" alt="logo" /></NavLink>
          <NavLink to="/" className="logo-color-Navbar logo-position-Navbar">
            <div className="new-logo_Navbar">
              <p className="letter-Navbar">D</p>
              <p>o</p>
              <p>g</p>
              <p>s</p>
              <p>T</p>
              <p>o</p>
              <p className="letter-Navbar">D</p>
              <p>o</p>
              <p>g</p>
              <p>s</p>
            </div>

          </NavLink>
        </div>
        <div id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link text-color-Navbar" aria-current="page" to="/">Главная</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-color-Navbar" to="/about">О Приложении</NavLink>
            </li>
            {auth
              ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-color-Navbar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to={`/profile/${auth?.id}`}>Мой профиль</NavLink></li>
                    <li><NavLink className="dropdown-item" to={`/myfriends/${auth?.id}`}>Мои подписки</NavLink></li>
                    {/* <li><NavLink className="dropdown-item" to={`
                    /event/${auth?.id}`}>Мои прогулки</NavLink></li> */}
                    <li><NavLink className="dropdown-item" to={`/mycreatedevents/${auth?.id}`}>Мои созданные прогулки</NavLink></li>
                    <li><NavLink className="dropdown-item" to={`/mydogs/${auth?.id}`}>Мои собаки</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(logoutTHUNK());
                          navigate('/');
                        }}
                      >
                        Выход
                      </a>

                    </li>
                  </ul>
                </li>
              )
              : (
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-color-Navbar" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Личный кабинет
                  </Link>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/registration">Регистрация</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/login">Вход</NavLink></li>
                  </ul>
                </li>

              )}
          </ul>
        </div>
      </div>
      <div className="line-box2">
        <div className="line2" />
      </div>
    </nav>
  );
}
