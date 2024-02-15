import { useState ,useContext} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../controller/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form action="" className="form" onSubmit={login}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="PassWord"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
