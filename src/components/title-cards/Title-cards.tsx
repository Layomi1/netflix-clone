import "./title-cards.scss";
import { useEffect, useRef, type FC } from "react";
import cards_data from "../../Cards_data.ts";

type CardItem = {
  name: string;
  image: string;
};

type Cards = {
  title?: string;
  // category: string;
};

const TitleCards: FC<Cards> = ({ title }) => {
  const cardsRef = useRef<HTMLDivElement | null>(null);

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
  }, []);

  return (
    <article className="title-cards">
      <h2>{title ? title : "Poplar on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((item: CardItem) => (
          <figure key={item.name}>
            <img src={item.image} alt={item.name} />
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default TitleCards;
