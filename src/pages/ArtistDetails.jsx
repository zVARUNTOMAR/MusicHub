import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { setActiveSong } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { id: artistId } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching: isFecthingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFecthingArtistDetails) {
    return <Loader title={"Loading Artist Details"}></Loader>;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      ></DetailsHeader>

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      ></RelatedSongs>
    </div>
  );
};

export default ArtistDetails;
