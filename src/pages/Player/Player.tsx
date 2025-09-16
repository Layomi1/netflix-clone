import "./player.scss";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

type PlayerInfo = {
  name: string;
  type: string;
  key: string;
  published_at: string;
};

const fetchMovie = async (id: string): Promise<PlayerInfo> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  );
  const data = await result.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No trailer found");
  }

  return data.results[0];
};
const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="back" onClick={handleBack} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${data.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{data.published_at.slice(0, 10)}</p>
        <p>{data.name}</p>
        <p>{data.type}</p>
      </div>
    </div>
  );
};

export default Player;
