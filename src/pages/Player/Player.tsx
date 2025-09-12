import "./player.scss";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type PlayerInfo = {
  name: string;
  type: string;
  key: string;
  published_at: string;
};

const Player = () => {
  const [apiData, setApiData] = useState<PlayerInfo>({
    name: "",
    type: "",
    key: "",
    published_at: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWU3OTRiOWM4NjQ5Mjg1ZTFjM2JiMWZmMTJmM2ExMyIsIm5iZiI6MTc1NzUwMTU4My45NTUwMDAyLCJzdWIiOiI2OGMxNTg4ZmJhMTI5M2IzOTI5YmQ0MjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uzA5_e61I4vC8xY-4pPpgWW1Es-_k_AJ3Oq337R7L8g",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="back" onClick={handleBack} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
