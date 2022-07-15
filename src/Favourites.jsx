import d2d from "degrees-to-direction";

const favourite = ({ location, wind_speed, wind_direction, id }) => {
  return (
    <div className="box_container" key={id}>
      <h4>Location: {location}</h4>
      <p>Wind speed: {wind_speed}kph</p>
      <p>Wind direction: {d2d(wind_direction)}</p>
    </div>
  );
};

const Favourites = ({ city, favourites, setFavourites }) => {
  return (
    <section className="favourites_container">
      <button
        className="favourites_button"
        onClick={() =>
          setFavourites((oldFavourites) => {
            const isMatch =
              oldFavourites?.some((fav) => fav.id === city.id) ?? false;
            if (isMatch) return oldFavourites;

            const mergedFavourites = [
              ...oldFavourites,
              {
                location: city.name,
                wind_speed: city.wind.speed,
                wind_direction: city.wind.deg,
                id: city.id,
              },
            ];

            localStorage.setItem(
              "favourites",
              JSON.stringify(mergedFavourites)
            );

            return mergedFavourites;
          })
        }
      >
        Favourite this location
      </button>
      {favourites === null ? (
        <p> Please add a favourite</p>
      ) : (
        <div>
          <h2>My Favourites</h2>
          {favourites.map(favourite)}
        </div>
      )}
    </section>
  );
};
export default Favourites;
