import { useEffect, useRef } from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.svg";
import bellIcon from "../../assets/bell_icon.svg";
import profileIcon from "../../assets/profile_img.png";
import dropdownIcon from "../../assets/caret_icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add("nav-dark");
      } else {
        navRef.current?.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logout Successful!");
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={searchIcon} alt="search" className="icons" />
        <p>Children</p>
        <img src={bellIcon} alt="bell" className="icons" />
        <div className="nav-profile">
          <img src={profileIcon} alt="profile" className="profile" />
          <img src={dropdownIcon} alt="dropdown" className="icons" />
          <div className="dropdown">
            <Link to="" onClick={handleLogout} className="link">
              Sign Out of Netflix
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
