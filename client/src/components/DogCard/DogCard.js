import React from 'react';
import { Paper } from '@mui/material';
import './DogCard.css';

function DogCard({ item }) {
  return (
    <Paper>
      <div className="dog-profile-in-meeting">
        <h6 className="line-profile-in-meeting text-profile-in-meeting">
          <img src={item?.img} width="100px" height="100px" className="img-profile-in-meeting" alt="user-img" />
          <div className="text-title-profile-in-meeting">
            Имя:
          </div>
          <div className="text-body-profile-in-meeting">
            {item.name}
          </div>
        </h6>
        <h6 className="line-profile-in-meeting text-profile-in-meeting">
          <div className="text-title-profile-in-meeting">
            Порода:
          </div>
          <div className="text-body-profile-in-meeting">
            {item.breed}
          </div>
        </h6>
        <h6 className="line-profile-in-meeting text-profile-in-meeting">
          <div className="text-title-profile-in-meeting">
            Темперамент:
          </div>
          <div className="text-body-profile-in-meeting">
            {item.temper}
          </div>
        </h6>
        <h6 className="line-profile-in-meeting text-profile-in-meeting">
          <div className="text-title-profile-in-meeting">
            Возраст:
          </div>
          <div className="text-body-profile-in-meeting">
            {item.age}
          </div>
        </h6>
        <h6 className="line-profile-in-meeting text-profile-in-meeting">
          <div className="text-title-profile-in-meeting">
            Пол:
          </div>
          <div className="text-body-profile-in-meeting">
            {item.Gender?.gender === 1 ? 'Самец' : 'Самка'}
          </div>
        </h6>
      </div>
    </Paper>
  );
}

export default DogCard;
