import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setiSLogin] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signUp',
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <div className="py-4">
            {!isLogin ? (
              <>
                <div className="pb-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="input w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="pb-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="pb-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="password"
                    className="input w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="pb-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="password"
                    className="input w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <p className="text-red-400">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary w-full"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? 'Loging' : 'SignUp'}
            </button>
          </div>

          <p onClick={() => setiSLogin((value) => !value)}>
            {isLogin ? 'New user use signUp!' : 'Already signup use login!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
