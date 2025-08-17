import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/users/request/received', {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRequest = async (status, id) => {
    const res = await axios.post(
      BASE_URL + '/requset/review/' + status + '/' + id,
      {},
      { withCredentials: true },
    );
    dispatch(removeRequest(res.id));
  };

  console.log(requests);

  useState(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1>No request found!</h1>;
  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold">Connection</h1>

      {requests.map((requests) => {
        const { _id, firstName, lastName, age, gender, profile, photoUrl } =
          requests.fromUserId;

        return (
          <div
            key={_id}
            className="flex p-4 m-4 mx-auto bg-base-300 w-1/2 rounded-lg"
          >
            <div>
              <img src={photoUrl} alt="" className="w-20 h-20 rounded-full" />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold">{firstName + ' ' + lastName}</h2>

              {age && gender && <p>{age + ' ' + gender}</p>}
              <p>{profile}</p>
            </div>

            <div className="flex justify-center items-center gap-5">
              <button
                className="btn btn-secondary"
                onClick={() => handleRequest('rejected', requests._id)}
              >
                Rejected
              </button>
              <button
                className="btn btn-accent"
                onClick={() => handleRequest('accepted', requests._id)}
              >
                Accepted
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionRequest;
