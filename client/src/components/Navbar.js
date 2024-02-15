import { useEffect,useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../controller/UserContext";
function Navbar() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:8000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <div>
      <div className="navbar">
        <div>
          <Link to={"/"} className="logo">
            Blog
          </Link>
        </div>
        <div className="links">
          <ul>
            {username && (
              <>
                <Link to="/create">New Post</Link>
                <a onClick={logout}>logout</a>
              </>
            )}
            {!username && (
              <>
                {" "}
                <Link to="/login" className="link">
                  Login
                </Link>
                <Link to="/signup" className="link">
                  SignUp
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
