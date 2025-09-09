import "./login.scss";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";

const Login = () => {
  const handleSignin = () => {};
  return (
    <div className="login">
      <img src={logo} alt="logo" />
      <div className="login-form">
        <h1>Sign in</h1>
        <form>
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Email only" />
          <input type="passord" placeholder="Password" />

          <button onClick={handleSignin}>Sign In</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="Remember Me"></label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
