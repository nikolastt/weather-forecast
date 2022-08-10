import React from "react";

interface ICitiesNames {
  onClickCity: (text: string) => void;
}

const CitiesNames: React.FC<ICitiesNames> = ({ onClickCity }) => {
  const cities = [
    {
      id: 1,
      name: "Londres",
    },
    {
      id: 2,
      name: "São Paulo",
    },
    {
      id: 3,
      name: "Rio de Janeiro",
    },
    {
      id: 4,
      name: "Bahia",
    },
  ];
  return (
    <div className="flex justify-around items-center py-6 ">
      {cities.map((city) => (
        <button
          className="text-white px-2 font-medium hover:scale-125 transition ease-out cursor-pointer"
          onClick={() => onClickCity(city.name)}
          key={city.id}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default CitiesNames;
