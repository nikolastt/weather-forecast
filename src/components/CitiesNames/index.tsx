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
      name: "Nova Lima",
    },
    {
      id: 3,
      name: "São Paulo",
    },
    {
      id: 4,
      name: "Rio de Janeiro",
    },
    {
      id: 5,
      name: "Bahia",
    },
  ];
  return (
    <div className="py-6 flex justify-around ">
      {cities.map((city) => (
        <button
          className="text-white font-medium hover:scale-125 transition ease-out cursor-pointer"
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
