import React from 'react';
import { Paper } from '@mui/material';
import '../Event/Event.css';

function DogCard({ item }) {
  const dogTemper = (genderId) => {
    if (genderId === 1) return 'Активный';
    if (genderId === 1) return 'Нейтральный';
    if (genderId === 1) return 'Спокойный';
    return genderId;
  };
  return (
    <Paper>
      <div className="super-container-event">
        <div className="container-event">
          <div className="inner-event">
            <img src={item?.img} width="100px" height="100px" className="img-profile-in-meeting" alt="user-img" />
            <h7 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Имя:
              </div>
              <div className="text-body-profile-in-meeting">
                {item?.name}
              </div>
            </h7>
            <h7 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Порода:
              </div>
              <div className="text-body-profile-in-meeting">
                {item?.breed}
              </div>
            </h7>
            <h7 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Темперамент:
              </div>
              <div className="text-body-profile-in-meeting">
                {dogTemper(item.temper_id)}
              </div>
            </h7>
            <h7 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Возраст:
              </div>
              <div className="text-body-profile-in-meeting">
                {item?.age}
              </div>
            </h7>
            <h7 className="line-profile-in-meeting text-profile-in-meeting">
              <div className="text-title-profile-in-meeting">
                Пол:
              </div>
              <div className="text-body-profile-in-meeting">
                {item.Gender?.gender === 1 ? 'Самец' : 'Самка'}
              </div>
            </h7>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default DogCard;
