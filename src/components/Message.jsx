import React, { useEffect, useState } from 'react'

export default function Message({ message, colorMsg }) {
  const [visible, setVisible] = useState(false);

  const colorClasses = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  };

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 2800); // hide before unmounting
      return () => clearTimeout(timeout);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 py-5 px-10 text-white rounded-sm shadow-md text-lg font-roboto transition-all duration-500 ease-in-out transform 
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-28'} 
        ${colorClasses[colorMsg] || colorClasses.blue}`}
    >
      {message}
    </div>
  );
}