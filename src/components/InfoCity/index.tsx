import React from "react";
import { IWeatherData } from "../../pages";

interface IInfoCity {
  weatherData: IWeatherData;
}

const InfoCity: React.FC<IInfoCity> = ({
  weatherData: { name, country, description, date },
}) => {
  return (
    <div className="pt-6 flex flex-col items-center">
      <h2 className="text-gray-200 text-lg font-light text-center">
        {date.dayOfWeek}, {date.day} de {date.month} {date.year} | Hora:{" "}
        {date.hour}:{date.minutes < 10 ? "0" : ""}
        {date.minutes}
      </h2>

      <h1 className="py-6 text-white text-3xl font-bold">
        {name}, {country}
      </h1>

      <p className=" text-cyan-300 capitalize ">{description}</p>
    </div>
  );
};

export default InfoCity;
