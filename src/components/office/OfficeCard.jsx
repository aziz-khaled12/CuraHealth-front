import React from "react";

const OfficeCard = ({ card }) => {
  return (
    <div className="p-6 flex-1 border border-[#B4B4B4] rounded-lg bg-white ">
      <div className=" flex items-center mb-4 justify-between w-full">
        <h1 className="font-medium text-base">{card.title}</h1>
        {card.icon}
      </div>
      <h1 className="font-semibold text-3xl">{card.value}</h1>
    </div>
  );
};

export default OfficeCard;
