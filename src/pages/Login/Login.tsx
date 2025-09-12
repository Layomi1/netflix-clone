import "./login.scss";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";
import { useState } from "react";
import { Link } from "react-router";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
  const [signState, setSignState] = useState(false);
  const [loading, setLoading] = useState(false);

  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const user_auth = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (signState === false) {
      await login(field.email, field.password);
    } else {
      await signup(field.name, field.email, field.password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="spinner">
      <img src={netflix_spinner} alt="spinner" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="logo" />
      <div className="login-form">
        <h1>{signState ? "Sign Up" : "Sign In"}</h1>
        <form onSubmit={user_auth}>
          {signState && (
            <input
              type="text"
              value={field.name}
              onChange={(e) => setField({ ...field, name: e.target.value })}
              placeholder="Your name"
            />
          )}

          <input
            type="email"
            value={field.email}
            onChange={(e) => setField({ ...field, email: e.target.value })}
            placeholder="Email only"
          />
          <input
            type="password"
            value={field.password}
            onChange={(e) => setField({ ...field, password: e.target.value })}
            placeholder="Password"
          />
          <Button
            type="submit"
            style={{
              padding: "16px",
              backgroundColor: "#e50914",
              color: "#fff",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              marginTop: "2Opx",
            }}
            children="Sign In"
          />

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
