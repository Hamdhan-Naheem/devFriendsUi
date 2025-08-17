import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLasttName] = useState(user.lastName);
  const [profile, setProfile] = useState(user.profile);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          profile,
          photoUrl,
          age,
          gender,
          skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data));

      if (res?.data) {
        setSuccess(res.data.message);
      }

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-200 w-96 shadow-sm mx-5">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="py-4">
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
                  placeholder="Last name"
                  className="input w-full"
                  value={lastName}
                  onChange={(e) => setLasttName(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <input
                  type="text"
                  placeholder="Profile"
                  className="input w-full"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <input
                  type="text"
                  placeholder="photo url"
                  className="input w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <input
                  type="text"
                  placeholder="age"
                  className="input w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    defaultValue="Pick a browser"
                    className="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                  <span className="label">Optional</span>
                </fieldset>
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="skills"
                  className="input w-full"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </div>

            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="card-actions justify-center">
              <button className="btn btn-primary w-full" onClick={handleEdit}>
                Save
              </button>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, profile, age, gender, skills }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Updated successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
