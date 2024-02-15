import { useState } from "react";
import { Navigate } from "react-router-dom";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      setRedirect(true)
      alert("Registration done");
    } else {
      alert("User already exist! Please login");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form onSubmit={register} action="" className="form">
        <h2>SignUp</h2>
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
        <button>Signup</button>
      </form>
    </div>
  );
}
