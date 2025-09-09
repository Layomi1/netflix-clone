import "./footer.scss";
import youtubeIcon from "../../assets/youtube_icon.png";
import twitterIcon from "../../assets/twitter_icon.png";
import instagramIcon from "../../assets/instagram_icon.png";
import facebookIcon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={facebookIcon} alt="facebook" />
        <img src={instagramIcon} alt="instagram" />
        <img src={twitterIcon} alt="twitter" />
        <img src={youtubeIcon} alt="youtube" />
      </div>
      <ul>
        <li>
          <a href="#">Audio Description</a>
        </li>
        <li>
          <a href="#">Help Center</a>
        </li>
        <li>
          <a href="#">Gift Cards</a>
        </li>
        <li>
          <a href="#">Media Center</a>
        </li>
        <li>
          <a href="#">Investor Relations</a>
        </li>
        <li>
          <a href="#">Jobs</a>
        </li>
        <li>
          <a href="#">Terms of Use</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
        <li>
          <a href="#">Legal Notices</a>
        </li>
        <li>
          <a href="#">Cookie Preference</a>
        </li>
        <li>
          <a href="#">Corporate Information</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
      <p className="copyright-text">
        Copyright&copy; 1997- {new Date().getFullYear()} Netflix Inc.
      </p>
    </div>
  );
};

export default Footer;
