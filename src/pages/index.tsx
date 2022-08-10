import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CitiesNames from "../components/CitiesNames";
import InfoCity from "../components/InfoCity";
import Inputs from "../components/Inputs";
import WeatherDetails from "../components/WeatherDetails";
import getFormattedWeatherData from "../services/weatherservice";

import { AiFillExclamationCircle } from "react-icons/ai";
import { BounceLoader } from "react-spinners";

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
  cod: number;
}

const Home: NextPage = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState<string | undefined>("q=Paris");
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [units, setunits] = useState<"metric" | "imperial">("metric");
  const [border, setBorder] = useState("");
  const [bg, setBg] = useState("bg-gradient-to-tr from-sky-500 to-blue-700");

  // const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
  // };

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
      city
        ? setSearch(`q=${city.trim()}`)
        : setBorder("border-4 border-red-500");
      setCity("");
    }
  };

  console.log(weatherData?.cod);

  return (
    <div className={`w-screen min-h-screen px-3 ${bg} `}>
      <main className="mx-auto max-w-2xl h-full">
        {weatherData?.cod === 200 && (
          <>
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
                  ? setSearch(`q=${city.trim()}`)
                  : setBorder("border-4 border-red-500");
                setCity("");
              }}
              handleUserLocation={() => handleUserLocation()}
              border={border}
              city={city}
            />
            <InfoCity weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
          </>
        )}

        {weatherData?.cod === 404 && (
          <div className="flex flex-col items-center w-full mt-56">
            <AiFillExclamationCircle size={100} color="white" />
            <h1 className="text-center text-white text-xl mt-6">
              A busca falhou :( <br /> tente novamente
            </h1>
          </div>
        )}

        {!weatherData && (
          <div className="fixed top-[calc(50%-50px)] left-[calc(50%-50px)]">
            <BounceLoader color="#fffffffd" loading={true} size="100px" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
