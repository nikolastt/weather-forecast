import React from "react";

import { GoLocation, GoSearch } from "react-icons/go";

interface IInputs {
  onChange: (text: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clickMetric: () => void;
  clickImperial: () => void;
  clickSearch: () => void;
  handleUserLocation: () => void;
  border: string;
  city: string;
}

const Inputs: React.FC<IInputs> = ({
  onChange,
  onKeyDown,
  clickMetric,
  clickImperial,
  clickSearch,
  handleUserLocation,
  border,
  city,
}) => {
  return (
    <div className="   items-center  sm:flex">
      <div className=" flex  sm:p-0 w-full ">
        <input
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(event) => onKeyDown(event)}
          className={`py-2 flex-1 w-full h-10 px-2 rounded-md focus:outline-none shadow-xl ${border} `}
          type="text"
          placeholder="Digite a cidade..."
          value={city}
        />
        <div className="flex items-center justify-center space-x-6 mx-6">
          <GoSearch
            onClick={clickSearch}
            className="hover:scale-125 transition ease-out cursor-pointer"
            color="white"
            size={25}
          />
          <GoLocation
            onClick={handleUserLocation}
            className="hover:scale-125 transition ease-out cursor-pointer"
            color="white"
            size={25}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 justify-center pt-6 text-white text-2xl sm:items-center sm:pt-0 ">
        <button
          onClick={clickMetric}
          className="hover:scale-125 transition ease-out cursor-pointer"
        >
          °C
        </button>
        <p>|</p>
        <button
          onClick={clickImperial}
          className="hover:scale-125 transition ease-out cursor-pointer"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
