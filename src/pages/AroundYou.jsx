import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
const CountryTracks = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    //at_pHO3LaBjYyC6tPrXviFB1a3n0nbyC
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_pHO3LaBjYyC6tPrXviFB1a3n0nbyC`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) {
    return <Loader title={"Loading Songs...."}></Loader>;
  }

  if (error && country) {
    return <Error></Error>;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <br />
        <span className="font-black text-gray-400 text-sm">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            ></SongCard>
          );
        })}
      </div>
    </div>
  );
};

export default CountryTracks;
