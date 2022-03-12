import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

// ,setMenu
const Menu = ({
  menu,
  setMenu,
  setVeganRecipe,
  setNotVeganRecipe,
  veganRecipe,
  notVeganRecipe,
}) => {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHealthScore, setTotalHealthScore] = useState(0);

  useEffect(() => {
    console.log(menu);
    let totalPriceCalc = 0;
    let totalMinutesCalc = 0;
    let totalHealthCalc = 0;

    menu?.forEach((el) => {
      totalPriceCalc += el.pricePerServing;
      totalMinutesCalc += el.readyInMinutes;
      totalHealthCalc += el.healthScore;
    });
    setTotalMinutes(totalMinutesCalc);
    setTotalPrice(totalPriceCalc);
    setTotalHealthScore(totalHealthCalc)
  }, [menu]);
  const handleRemoveToMenu = (id) => {
    const itemRemove = menu.filter((el) => el.id === id);
    const updateMenu = menu.filter((el) => el.id !== id);

    setMenu(updateMenu);

    console.log(itemRemove);
    const isVegan =
      itemRemove[0].diets.filter((el) => el.toLowerCase().includes("vegan"))
        .length > 0 ||
      itemRemove[0].vegan ||
      itemRemove[0].title.toLowerCase().includes("vegan");

    console.log(veganRecipe);
    if (isVegan) {
      const updateVegan = veganRecipe.slice(1);

      setVeganRecipe(updateVegan);
    } else {
      const updateNotVegan = notVeganRecipe.slice(1);

      setNotVeganRecipe(updateNotVegan);
    }
  };

  return (
    <>
      {menu.length ? (
        <div className="menu__section-container">
          <div className="header__menu">
            <h2 style={{ zIndex: "10", color: "#fff", margin: "0" }}>
              <Link
                to="/addrecipe"
                style={{ textDecoration: "underline", color: "#bd0d0d" }}
              >
                Add recipes to the menu.
              </Link>
            </h2>
            <h1 style={{ color: "#fff", fontSize: "55px" }}>Menu</h1>
          </div>
          <div className="menu-container">
            {menu?.map((data) => (
              <MenuItem
                data={data}
                key={data.id + 1}
                handleRemoveToMenu={handleRemoveToMenu}
              />
            ))}
          </div>
          <footer className="menu__footer">
            <h3
              style={{ margin: "0", fontSize: "30px", paddingBottom: "1rem" }}
            >
              Menu Information:
            </h3>
            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
            <h5>Total Minutes: {totalMinutes} min.</h5>
            <h5>Total Health Score: {totalHealthScore}</h5>

          </footer>
        </div>
      ) : (
        <div className="menu__empty-container">
          <h2 style={{ zIndex: "10", color: "#fff" }}>
            Your menu is empty.{" "}
            <Link
              to="/addrecipe"
              style={{ textDecoration: "underline", color: "#bd0d0d" }}
            >
              Add recipes to the menu.
            </Link>
          </h2>
        </div>
      )}
    </>
  );
};

export default Menu;
