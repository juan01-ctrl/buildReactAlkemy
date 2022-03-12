import { useEffect, useState } from "react";
import "./App.css";
import "./Loader.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AddRecipe from "./pages/AddRecipe";
// import Menu from './components/Menu';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [veganRecipe, setVeganRecipe] = useState([]);
  const [notVeganRecipe, setNotVeganRecipe] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token-x")) {
      setIsLogged(true);
    }
    if (window.innerWidth > 900) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  });

  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={
            !isLogged && (
              <Login
                setIsLogged={setIsLogged}
                isDesktop={isDesktop}
                setIsDesktop={setIsDesktop}
                search={search}
                setSearch={setSearch}
              />
            )
          }
        />
        <Route
          path="/"
          element={
            <Login
              setIsLogged={setIsLogged}
              isDesktop={isDesktop}
              setIsDesktop={setIsDesktop}
              search={search}
              setSearch={setSearch}
            />
          }
        />

        <Route
          path="home"
          element={
            !isLogged ? (
              <Login
                setIsLogged={setIsLogged}
                isDesktop={isDesktop}
                setIsDesktop={setIsDesktop}
                search={search}
                setSearch={setSearch}
              />
            ) : (
              <Home
                menu={menu}
                setMenu={setMenu}
                setVeganRecipe={setVeganRecipe}
                setNotVeganRecipe={setNotVeganRecipe}
                veganRecipe={veganRecipe}
                notVeganRecipe={notVeganRecipe}
              />
            )
          }
          exact
        />
        <Route
          path="addrecipe"
          element={
            !isLogged ? (
              <Login
                setIsLogged={setIsLogged}
                isDesktop={isDesktop}
                setIsDesktop={setIsDesktop}
                search={search}
                setSearch={setSearch}
              />
            ) : (
              <AddRecipe
                setSearch={setSearch}
                menu={menu}
                search={search}
                setMenu={setMenu}
                veganRecipe={veganRecipe}
                setVeganRecipe={setVeganRecipe}
                notVeganRecipe={notVeganRecipe}
                setNotVeganRecipe={setNotVeganRecipe}
              />
            )
          }
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
