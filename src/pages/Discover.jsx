import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch,useSelector } from "react-redux";

const Discover = () => {
  const {data,isFetching,error} = useGetTopChartsQuery();
  const genereTitle = "Pop";
  const dispatch = useDispatch();
  const {activeSong,isPlaying} = useSelector((state)=>state.player);
  if(isFetching) { 
    return <Loader title="Loading Songs..."></Loader>
  }

  if(error){
    return <Error/>
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">
          Discover {genereTitle}
        </h2>
        <select
          name=""
          id=""
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres?.map((genre) => {
            return (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start gap-8">
          {data?.map((song,i)=>{
            return <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data}/>
          })}
      </div>
    </div>
  );
};

export default Discover;