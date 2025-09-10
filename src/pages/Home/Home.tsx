import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import hero_title from "../../assets/hero_title.png";
import play from "../../assets/play_icon.png";
import infoIcon from "../../assets/info_icon.png";
import TitleCards from "../../components/title-cards/Title-cards";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const handlePlay = () => {};
  const handleInfo = () => {};

  return (
    <div className="home">
      <Navbar />
      <article className="hero">
        <figure className="hero-caption">
          <img src={hero_title} alt="title" className="caption-img" />
          <figcaption>
            Discovering his ties to an secret ancient order, a young man living
            in a modern Istanbul emabarks on a quest to save the city from
            imortal enemy.
          </figcaption>
          <div className="hero-btns">
            <Button handleClick={handlePlay}>
              <img src={play} alt="Play" />
              <span>Play</span>
            </Button>

            <Button handleClick={handleInfo}>
              <img src={infoIcon} alt="info" />
              <span>More Info</span>
            </Button>
          </div>
        </figure>
      </article>

      <TitleCards />
      <div className="more-cards">
        <TitleCards title="Blockbuster Movies" />
        <TitleCards title="Only on Netflix" />
        <TitleCards title="Upcoming" />
        <TitleCards title="Top Picks for You" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
