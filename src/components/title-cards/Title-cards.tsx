import { useEffect, useRef, type FC } from "react";
import { Link } from "react-router-dom";
import "./title-cards.scss";
import { useQuery } from "@tanstack/react-query";

type CardItem = {
  title: string;
  poster_path: string;
  id: string;
};

type Cards = {
  title?: string;
  category?: string;
};

const fetchMovies = async (category?: string): Promise<CardItem[]> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${
      category ?? "now_playing"
    }?language=en-US&page=1`,
    options
  );
  const data = await res.json();
  if (data.success === false) {
    throw new Error(data.status_message || "API Error");
  }

  return data.results || [];
};

const TitleCards: FC<Cards> = ({ title, category }) => {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies(category),
    staleTime: 1000 * 60 * 5,
  });

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += e.deltaY;
    }
  };
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <article className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {data?.map((item: CardItem) => (
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
