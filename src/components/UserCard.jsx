import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeRequestFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, profile, age, gender, skills } =
    user;

  const handleRequestClick = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + '/request/send/' + status + '/' + userId,
      {},
      { withCredentials: true },
    );
    dispatch(removeRequestFeed(res.userId));
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="py-2">
        <img src={photoUrl} alt="user image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p>{profile}</p>
        {age && gender && <p>{age + '  ' + gender}</p>}
        {skills && <p>{skills}</p>}
        <div className="card-actions justify-center gap-7 pt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleRequestClick('interested', _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRequestClick('ignore', _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
