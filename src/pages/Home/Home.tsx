import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play from "../../assets/play_icon.png";
import infoIcon from "../../assets/info_icon.png";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <article className="hero">
        <img src={hero_banner} alt="banner" className="banner-img" />
        <figure className="hero-caption">
          <img src={hero_title} alt="title" className="caption-img" />
          <figcaption>
            Discovering his ties to an secret ancient order, a young man living
            in a modern Istanbul emabarks on a quest to save the city from
            imortal enemy.
          </figcaption>
          <div className="hero-btns">
            <button className="btn">
              <img src={play} alt="play" />
              <span>Play</span>
            </button>
            <button className="btn dark-btn">
              <img src={infoIcon} alt="more info" />
              <span> More Info</span>
            </button>
          </div>
        </figure>
      </article>
    </div>
  );
};

export default Home;
