import React from "react";

export default function Cards({ text, number, className, icon }) {
  return (
    <div className="bg-white shadow flex flex-col justify-between rounded-2xl p-2 text-center">
      <h2 className="text-gray-600 text-sm">{text}</h2>
      <div
        className={`flex justify-center items-center text-4xl font-bold gap-2 ${className}`}
      >
        <p>{number}</p>
        <div>{icon}</div>
      </div>
    </div>
  );
}
