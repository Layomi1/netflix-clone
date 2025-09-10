import "./login.scss";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";
import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [signState, setSignState] = useState(false);

  const handleSignin = () => {};
  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <div className="login-form">
        <h1>{signState ? "Sign Up" : "Sign In"}</h1>
        <form>
          {signState && <input type="text" placeholder="Your name" />}

          <input type="email" placeholder="Email only" />
          <input type="passord" placeholder="Password" />
          <Button
            handleClick={handleSignin}
            style={{
              padding: "16px",
              backgroundColor: "#e50914",
              color: "#fff",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              marginTop: "2opx",
            }}
          >
            Sign In
          </Button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="Remember Me">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState ? (
            <p>
              Already have account?{" "}
              <Link to="#" onClick={() => setSignState((prev) => !prev)}>
                Sign In Now
              </Link>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <Link to="#" onClick={() => setSignState((prev) => !prev)}>
                Sign Up Now
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
