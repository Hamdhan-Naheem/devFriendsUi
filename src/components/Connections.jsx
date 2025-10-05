import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connections';
import { Link } from 'react-router-dom';

const Connections = () => {
  const distpatch = useDispatch();
  const connecions = useSelector((state) => state.connections);

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + '/users/connections', {
        withCredentials: true,
      });

      distpatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(typeof connecions);
  useEffect(() => {
    getConnection();
  }, []);

  if (!connecions) return;

  if (connecions.length === 0) return <h1>No connection found!</h1>;
  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold">Connection</h1>

      {connecions.map((connection) => {
        const { _id, firstName, lastName, age, gender, profile, photoUrl } =
          connection;

        return (
          <div
            key={_id}
            className="flex justify-between p-4 m-4 mx-auto bg-base-300 w-1/2 rounded-lg"
          >
            <div className="flex">
              <div>
                <img src={photoUrl} alt="" className="w-20 h-20 rounded-full" />
              </div>

              <div className="text-left mx-4">
                <h2 className="font-bold">{firstName + ' ' + lastName}</h2>
                {age && gender && <p>{age + ' ' + gender}</p>}
                <p>{profile}</p>
              </div>
            </div>

            <div className="bg-gray-500 w-32 h-10 rounded-lg flex items-center justify-center">
              <Link to={'/chat/' + _id}>
                <button className="">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
