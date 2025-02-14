import React from 'react';


interface NotificationProps {
    message: string,
    type: 'info' | 'success' | 'error';
    onClose: () => void
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  const notificationStyles = {
    success: 'bg-success text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed top-10 right-4 w-80 p-4 rounded shadow-lg ${notificationStyles[type]}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Notification;