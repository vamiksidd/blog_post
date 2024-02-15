import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserContextProvider } from "./controller/UserContext";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index of element={<IndexPage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/create"} element={<CreatePost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
