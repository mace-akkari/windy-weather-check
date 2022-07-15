import { useState } from "react";
import d2d from "degrees-to-direction";
import Favourites from "./Favourites";

const favouritesFromStorage = JSON.parse(localStorage.getItem("favourites"));

const Weather = () => {
  const [weatherData, setweatherData] = useState([]);
  const [favourites, setFavourites] = useState(favouritesFromStorage ?? []);
  const [selectedCity, setSelectedCity] = useState("");
  const ApiKey = "f694ce2ba95ee8b3677917d9205dbc0b";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&APPID=${ApiKey}`;

  const weatherApi = async (e) => {
    if (e?.key === "Enter") {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setweatherData(data);
        return data;
      } catch (error) {
        console.error(error);
        alert(
          "A strong storm has caused an error with your request. Please refresh your browser to calm the storm"
        );
      }
    }
  };

  return (
    <div className="weather_container">
      <h1>Find a forecast</h1>
      <input
        className="input_box"
        placeholder="search for a place...."
        onChange={(event) => setSelectedCity(event.target.value)}
        value={selectedCity}
        onKeyPress={weatherApi}
      />
      {typeof weatherData.name === "undefined" ? (
        <div></div>
      ) : (
        <div>
          <p>Location: {weatherData.name}</p>
          <p> Wind Speed: {weatherData.wind.speed} mph</p>
          <p>Wind direction: {d2d(weatherData.wind.deg)}</p>
        </div>
      )}

      <Favourites
        city={weatherData}
        favourites={favourites}
        setFavourites={setFavourites}
      />
    </div>
  );
};

export default Weather;
