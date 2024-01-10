import React from 'react';
const Notification = () => {
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg">Notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
