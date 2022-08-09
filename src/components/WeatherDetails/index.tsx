import Image from "next/image";
import React from "react";

import { FaTemperatureHigh } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { FaWind } from "react-icons/fa";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsSun, BsSunset } from "react-icons/bs";
import { IWeatherData } from "../../pages";

interface IWeatherDetails {
  weatherData: IWeatherData;
}

const WeatherDetails: React.FC<IWeatherDetails> = ({
  weatherData: {
    temp,
    feels_like,
    humidity,
    temp_max,
    temp_min,
    speed,
    sunrise,
    sunset,
    icon,
  },
}) => {
  const iconWeather = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <>
      <div className="flex pt-6 items-center ">
        <div className="w-1/4 relative h-full ">
          <Image src={iconWeather} alt="logo" width="100px" height="100px" />
        </div>
        <div className="w-2/4 flex justify-center">
          <h1 className="text-7xl text-white ">{temp}°</h1>
        </div>

        <div className="w-1/4 text-white font-light space-y-2">
          <p className="flex items-center">
            <FaTemperatureHigh className="mr-3" />
            Sensação: {feels_like}°
          </p>
          <p className="flex items-center">
            <BsDropletHalf className="mr-3" />
            Humidade: {humidity}%
          </p>
          <p className="flex items-center">
            <FaWind className="mr-3" />
            ventos: {speed}km/h
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-6 text-white ">
        <div className="w-full  bg-black bg-opacity-25 h-24 rounded-lg flex flex-col justify-center items-center">
          <h1 className="flex items-center ">
            <AiOutlineArrowDown className="mr-2" /> min
          </h1>
          <h1>{temp_min} °C</h1>
        </div>

        <div className="w-full bg-black bg-opacity-25 h-24 rounded-lg flex flex-col justify-center items-center">
          <h1 className="flex items-center ">
            <AiOutlineArrowUp className="mr-2" /> max
          </h1>
          <h1>{temp_max} °C</h1>
        </div>

        <div className="w-full bg-black bg-opacity-25 h-24 rounded-lg flex flex-col justify-center items-center">
          <h1 className="flex items-center ">
            <BsSun className="mr-2" />
            Nascer do sol
          </h1>
          <h1>
            {sunrise.hour}:{sunrise.minutes < 10 ? "0" : ""}
            {sunrise.minutes}
          </h1>
        </div>

        <div className="w-full bg-black bg-opacity-25 h-24 rounded-lg flex flex-col justify-center items-center">
          <h1 className="flex items-center ">
            <BsSunset className="mr-2" /> Pôr do sol
          </h1>
          <h1>
            {sunset.hour}:{sunset.minutes < 10 ? "0" : ""}
            {sunset.minutes}
          </h1>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
