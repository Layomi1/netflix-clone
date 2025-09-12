import { useEffect, useRef, useState, type FC } from "react";
import { Link } from "react-router-dom";
import "./title-cards.scss";

type CardItem = {
  title: string;
  poster_path: string;
  id: string;
};

type Cards = {
  title?: string;
  category?: string;
};

const TitleCards: FC<Cards> = ({ title, category }) => {
  const [data, setData] = useState<CardItem[]>([]);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += e.deltaY;
    }
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
      `https://api.themoviedb.org/3/movie/${
        category ?? "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setData(res.results))

      .catch((err) => console.error(err));

    const el = cardsRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <article className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {data.map((item: CardItem) => (
          <figure key={item.id}>
            <Link to={`player/${item.id}`} className="card-list-link">
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                />
              )}
              <figcaption>{item.title}</figcaption>
            </Link>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default TitleCards;
