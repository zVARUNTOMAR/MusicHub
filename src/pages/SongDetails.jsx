import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { setActiveSong } from "../redux/features/playerSlice";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFecthing: isFecthingSongsDetails } =
    useGetSongDetailsQuery({ songid });

  const {
    data,
    isFetcing: isFecthingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFecthingRelatedSongs || isFecthingSongsDetails) {
    return <Loader title={"Searching Song Details..."}></Loader>;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData}></DetailsHeader>
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
      </div>
      <div className="mt-1">
        {songData?.sections[1].type === "LYRICS" ? (
          songData?.sections[1].text.map((line, i) => (
            <p className="text-gray-400 text-base my-1">{line}</p>
          ))
        ) : (
          <p>Sorry, no Lyrics found</p>
        )}
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      ></RelatedSongs>
    </div>
  );
};

export default SongDetails;
