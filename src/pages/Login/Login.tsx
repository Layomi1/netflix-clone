import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import "./login.scss";
import { FirebaseError } from "firebase/app";
import logo from "../../assets/logo.png";
import Button from "../../components/button/Button";
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

  const getErrorMessage = (errorCode: string): string => {
    const errorMap: Record<string, string> = {
      "auth/user-not-found": "No account found with this email address",
      "auth/wrong-password": "Incorrect password. Please try again",
      "auth/email-already-in-use": "An account with this email already exists",
      "auth/weak-password": "Password should be at least 6 characters",
      "auth/invalid-email": "Please enter a valid email address",
      "auth/too-many-requests":
        "Too many failed attempts. Please try again later",
      "auth/network-request-failed":
        "Network error. Please check your connection",
    };
    return (
      errorMap[errorCode] || "An unexpected error occurred. Please try again"
    );
  };

  const user_auth = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (!signState) {
        await login(field.email, field.password);
        toast.success("Login Successful");
      } else {
        await signup(field.name, field.email, field.password);
        toast.success("Signup Successful");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const userFriendlyMessage = getErrorMessage(error.code);

        toast.error(userFriendlyMessage);
      } else {
        toast.error(
          signState
            ? "Failed to create account. Please try again"
            : "Login failed. Please try again"
        );
      }
    } finally {
      setLoading(false);
    }
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
              marginTop: "20px",
              opacity: (
                signState
                  ? !(field.name && field.email && field.password)
                  : !(field.email && field.password)
              )
                ? 0.6
                : 1,
            }}
            disabled={
              signState
                ? !(field.name && field.email && field.password)
                : !(field.email && field.password)
            }
          >
            {signState ? "Sign Up" : "Sign In"}{" "}
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
