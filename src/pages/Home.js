import Menu from "../components/Menu";
import NavMenu from "../components/NavMenu";

const Home = ({ menu, setMenu,setVeganRecipe, setNotVeganRecipe,veganRecipe,
  notVeganRecipe }) => {
  return (
    <>
      <header>
        <NavMenu />
      </header>
      <main>
        <Menu
          menu={menu}
          setMenu={setMenu}
          setVeganRecipe={setVeganRecipe}
          setNotVeganRecipe={setNotVeganRecipe}
          veganRecipe={veganRecipe}
 notVeganRecipe={notVeganRecipe}
        />
      </main>
    </>
  );
};

export default Home;
