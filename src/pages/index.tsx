import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CitiesNames from "../components/CitiesNames";
import InfoCity from "../components/InfoCity";
import Inputs from "../components/Inputs";
import WeatherDetails from "../components/WeatherDetails";
import getFormattedWeatherData from "../services/weatherservice";

import { AiFillExclamationCircle } from "react-icons/ai";

export interface IWeatherData {
  country: string;
  description: string;
  date: {
    dayOfWeek: string;
    month: string;
    day: number;
    year: number;
    hour: number;
    minutes: number;
    isNight: boolean;
  };
  feels_like: number;
  humidity: number;
  icon: string;
  name: string;
  speed: number;
  sunrise: {
    hour: number;
    minutes: number;
  };
  sunset: {
    hour: number;
    minutes: number;
  };
  temp: number;
  temp_max: number;
  temp_min: number;
}

const Home: NextPage = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState<string | undefined>("q=Paris");
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [units, setunits] = useState<"metric" | "imperial">("metric");
  const [border, setBorder] = useState("");
  const [bg, setBg] = useState("");
  const [userLatitude, setUserLatitude] = useState<number | undefined>();
  const [userLongitude, setUserLongitude] = useState<number | undefined>();

  //backUp

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { latitude, longitude },
        } = position;

        setSearch(`lat=${latitude}&lon=${longitude}`);
      });
    }
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  useEffect(() => {
    console.log("Entrou");
    const get = async () => {
      const data = await getFormattedWeatherData(search, units);

      const temp = units === "metric" ? 25 : 77;
      data && data?.temp < temp
        ? setBg("bg-gradient-to-tr from-sky-500 to-blue-700")
        : setBg("bg-gradient-to-tr from-yellow-700 to-orange-700");

      data?.date.isNight &&
        setBg("bg-gradient-to-tr from-gray-800 to-gray-900");

      setWeatherData(data);
    };
    get();
  }, [search, units]);

  const enterKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      city ? setSearch(`q=${city}`) : setBorder("border-4 border-red-500");
      setCity("");
    }
  };

  return (
    <div className={`w-screen h-screen ${bg} `}>
      <main className="max-w-2xl mx-auto">
        <CitiesNames
          onClickCity={(text) => {
            setSearch(`q=${text}`);
            setCity("");
          }}
        />
        <Inputs
          onChange={(text) => {
            setCity(text);
            setBorder("");
          }}
          onKeyDown={(e) => enterKeyPressed(e)}
          clickMetric={() => setunits("metric")}
          clickImperial={() => setunits("imperial")}
          clickSearch={() => {
            city
              ? setSearch(`q=${city}`)
              : setBorder("border-4 border-red-500");
            setCity("");
          }}
          handleUserLocation={() => handleUserLocation()}
          border={border}
          city={city}
        />
        {weatherData ? (
          <>
            <InfoCity weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
          </>
        ) : (
          <div className="flex flex-col items-center w-full mt-56">
            <AiFillExclamationCircle size={100} color="white" />
            <h1 className="text-center text-white text-xl mt-6">
              Nenhuma cidade foi encontrada com este nome :( <br /> tente
              novamente
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
