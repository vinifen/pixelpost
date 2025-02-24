import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../../components/LogOut';

const ProfileMenu: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="bg-primary-button absolute text-center w-48 right-0 top-16 sm:top-24 mx-2 min-h-36 flex flex-col shadow-xl">
      <div className="mx-2 flex-grow h-full flex flex-col justify-around">
        <h3 className="break-words text-lg font-semibold my-2">{username}</h3>
        <Link to={"/account"} className="bg-secundary-button w-full min-h-8 shadow-xl flex justify-center items-center"><p>Account</p></Link>
        <button className="bg-red-900 w-full min-h-8 shadow-xl" onClick={() => LogOut()}>Log out</button>
      </div>
    </div>
  );
}

export default ProfileMenu;
