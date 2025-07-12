import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../../icons';

function CustomUseDropDown() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpenDropDown(false);
  };

  return (
    <div className="relative inline-block">
      <button 
        onClick={() => setOpenDropDown(!openDropDown)}
        className="p-3 border rounded-full"
      >
        <UserIcon />
      </button>

      {openDropDown && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-10">
          <ul className="p-2">
            <li onClick={() => handleNavigate('/profile')} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">پروفایل</li>
            <li onClick={() => handleNavigate("/RequestList")} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">درخواست های من</li>
            <li onClick={() => handleNavigate('/logout')} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">خروج</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomUseDropDown;
