import React from 'react';
import { Paper } from '@mui/material';
import '../Event/Event.css';

function DogCard({ item }) {
  const dogTemper = (temperId) => {
    if (temperId === 1) return 'Активный';
    if (temperId === 2) return 'Нейтральный';
    if (temperId === 3) return 'Спокойный';
    return temperId;
  };
  return (
    <Paper>
      <div className="super-container-event">
        <div className="container-event">
          <div className="inner-event">
            <img src={item?.img} width="100px" height="100px" className="img-profile-in-meeting" alt="user-img" />
            <div className="Name-in-event">Собака</div>
            <div className="text-event">
              <h6 className="line-profile-in-meeting text-profile-in-meeting">
                <div className="text-title-profile-in-meeting">
                  Имя:
                </div>
                <div className="text-body-profile-in-meeting">
                  {item?.name}
                </div>
              </h6>
              <h6 className="line-profile-in-meeting text-profile-in-meeting">
                <div className="text-title-profile-in-meeting">
                  Порода:
                </div>
                <div className="text-body-profile-in-meeting">
                  {item?.breed}
                </div>
              </h6>
              <h6 className="line-profile-in-meeting text-profile-in-meeting">
                <div className="text-title-profile-in-meeting">
                  Характер:
                </div>
                <div className="text-body-profile-in-meeting">
                  {dogTemper(item.temper_id)}
                </div>
              </h6>
              <h6 className="line-profile-in-meeting text-profile-in-meeting">
                <div className="text-title-profile-in-meeting">
                  Возраст:
                </div>
                <div className="text-body-profile-in-meeting">
                  {item?.age}
                </div>
              </h6>
              <h6 className="line-profile-in-meeting text-profile-in-meeting">
                <div className="text-title-profile-in-meeting">
                  Пол:
                </div>
                <div className="text-body-profile-in-meeting">
                  {item.gender_id === 1 ? 'Самец' : 'Самка'}
                </div>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default DogCard;
