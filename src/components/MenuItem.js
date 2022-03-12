import React, { Fragment, useState } from "react";

const MenuItem = ({ data, handleAddToMenu, handleRemoveToMenu }) => {
  const [detailsActive, setDetailsActive] = useState(false);
  const handleDetails = () => {
    setDetailsActive((prev) => !prev);
  };
  function createMarkup() {
    let stringSummary = data.summary.split(".")[0];
    return { __html: stringSummary + "." };
  }

  return (
    <article className="recipe-container">
      <div className="recipe-content">
        <h3 style={{ color: "#fff", textAlign: "center", fontSize: "22px" }}>
          {data.title}
        </h3>
        <img
          src={data.image}
          alt={data.title}
          style={{ display: "block", margin: "auto", borderRadius: "6px" }}
        />

        <h4
          style={{
            margin: "20px 0 10px",
            fontSize: "18px",
            textDecoration: "underline",
          }}
        >
          Recipe details:
        </h4>
        <div className="recipe__details">
          <ul className="recipe__details-list">
            <li className="recipe__details-item">
              Summary:{" "}
              <span
                className="recipe__details-content"
                dangerouslySetInnerHTML={createMarkup()}
              ></span>
            </li>

            <li className="recipe__details-item">
              Dish type:{" "}
              <span className="recipe__details-content">
                {" "}
                {data.dishTypes[0]}.
              </span>
            </li>
            <li className="recipe__details-item">
              Price per serving:
              <span className="recipe__details-content">
                {" "}
                ${data.pricePerServing}.
              </span>
            </li>
            <li className="recipe__details-item">
              Servings:
              <span className="recipe__details-content"> {data.servings}.</span>
            </li>
            {detailsActive && (
              <>
                <li className="recipe__details-item">
                  Diet:{" "}
                  {data.diets.map((diet) => (
                    <span className="recipe__details-content">
                      {" "}
                      {diet}
                      {diet !== data.diets[data.diets.length - 1]
                        ? ","
                        : "."}{" "}
                    </span>
                  ))}
                </li>
                <li className="recipe__details-item">
                  Ready in:
                  <span className="recipe__details-content">
                    {" "}
                    {data.readyInMinutes} minutes.
                  </span>
                </li>
                <li className="recipe__details-item">
                  Health Score:
                  <span className="recipe__details-content">
                    {" "}
                    {data.healthScore}.
                  </span>
                </li>
              </>
            )}
          </ul>
          <button className="button__details" onClick={handleDetails}>
            {detailsActive ? "Show less" : "More details"}
          </button>
          <button
            className="addDel__button btn"
            onClick={
              handleAddToMenu
                ? () => handleAddToMenu(data.id)
                : () => handleRemoveToMenu(data.id)
            }
          >
            {handleAddToMenu ? "Add to menu" : "Remove to Menu"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MenuItem;
