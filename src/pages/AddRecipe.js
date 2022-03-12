
import MenuItem from "../components/MenuItem";
import MenuSearch from "../components/MenuSearch";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import NavMenu from "../components/NavMenu";

const AddRecipe = ({  menu, search,setSearch,setMenu,veganRecipe, setVeganRecipe,notVeganRecipe, setNotVeganRecipe }) => {
 


  //sweet alert

  const MySwal = withReactContent(Swal);

  //req data
  const { error, resData, isLoading } = useAxios(
    `https://api.spoonacular.com/recipes/complexSearch?query=${search}&addRecipeInformation=true&apiKey=33805a2fdfc649c096e7718fb12d2d8a`,
    search
  );


  const handleAddToMenu = (id) => {
    const newRecipe = resData.results.filter((el) => el.id === id);
    console.log(veganRecipe.length)

    const data = newRecipe[0]
    const isVegan = data.diets.filter((el) => el.toLowerCase().includes("vegan")).length > 0 ||
    data.vegan ||
    data.title.toLowerCase().includes("vegan");

  
    const includesMenu = menu?.filter((el) => el.id === data.id);


    if(includesMenu.length){
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "This recipe recipe is already on your menu",
      });
    }
    if(menu.length >=4){
        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "The menu is fully",
          });
    }else if(notVeganRecipe.length >= 2 && !isVegan){
        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "you already added two not vegan dishes",
          });
    }
    else if(veganRecipe.length >= 2 && isVegan){
        MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "you already added two vegan dishes",
          });
    }
  
    if (!includesMenu.length && menu.length < 4) {
      if (isVegan && veganRecipe.length < 2) {
        setVeganRecipe([...veganRecipe,"vegan"]);
      }
      if (!isVegan && notVeganRecipe.length < 2) {
        setNotVeganRecipe([...notVeganRecipe, "NotVegan"]);
      
      }
      if((isVegan && veganRecipe.length < 2) ||( !isVegan && notVeganRecipe.length < 2)){
        MySwal.fire({
          icon: "success",
          title: "Added",
          text: "Recipe added to menu successfully ",
        });
        setMenu([...menu, data]);
      }
     
    }

  };


  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ backgroundColor: "#191449", minHeight: "100vh" }}>
        <NavMenu/>
        <Link to="/home" className="back-to__menu">Back to Menu</Link>
      <div className="search__recipe-container">
        <h1 style={{ textAlign: "center", paddingTop: "1rem", color: "#fff" }}>
          Select recipes for your menu
        </h1>
        <p style={{ color: "rgba(150, 134, 134)", marginTop: "0",textAlign:"center" }}>
          (must select four dishes, two vegan and two non-vegan)
        </p>
        <MenuSearch setSearch={setSearch} />
      </div>
      {isLoading ? <div className="loader__container-home">
        <Loader />
      </div> :
      <div className="menu-container">
        {resData &&
          resData?.results?.map((data) => (
            <MenuItem
              data={data}
              key={data.id}
              handleAddToMenu={handleAddToMenu}
            />
          ))}
      </div>
}
    </div>
  );
};

export default AddRecipe;
