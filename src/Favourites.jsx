const favourite = ({ location, wind_speed, id }) => {
  return (
    <div key={id}>
      <h4>location: {location}</h4>
      <p>wind speed: {wind_speed}kph</p>
    </div>
  );
};

const Favourites = ({ city, favourites, setFavourites }) => {
  return (
    <section className="favourites_container">
      <button
        className="favourites"
        onClick={() =>
          setFavourites((oldFavourites) => {
            const isMatch =
              oldFavourites?.some((fav) => fav.id === city.id) ?? false;
            if (isMatch) return oldFavourites;

            const mergedFavourites = [
              ...oldFavourites,
              { location: city.name, wind_speed: city.wind.speed, id: city.id },
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
        favourites.map(favourite)
      )}
    </section>
  );
};
export default Favourites;
