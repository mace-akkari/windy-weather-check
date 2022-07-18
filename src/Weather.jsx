import { useState } from "react";
import d2d from "degrees-to-direction";
import Favourites from "./Favourites";
import { ReactComponent as Search } from "./icons/Search.svg";

const favouritesFromStorage = JSON.parse(localStorage.getItem("favourites"));

const Weather = () => {
  const [weatherData, setweatherData] = useState([]);
  const [favourites, setFavourites] = useState(favouritesFromStorage ?? []);
  const [selectedCity, setSelectedCity] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

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
      <div className="search_container">
        <input
          className="input_box"
          placeholder="search for a place...."
          onChange={(event) => setSelectedCity(event.target.value)}
          value={selectedCity}
          onKeyPress={weatherApi}
        />
        <Search />
      </div>
      {typeof weatherData.name === "undefined" ? (
        <div></div>
      ) : (
        <div className="results_container">
          <p>Location: {weatherData.name}</p>
          <p>Wind speed: {weatherData.wind.speed} mph</p>
          <p>Wind direction: {d2d(weatherData.wind.deg)}</p>
          <p>Description: {weatherData.weather[0].description} </p>
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
