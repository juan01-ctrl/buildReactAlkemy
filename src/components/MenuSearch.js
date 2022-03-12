import React, { useState } from "react";

const MenuSearch = ({ setSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length > 2) {
      setSearch(searchValue);
    }
  };
  return (
    <div className="menu__search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search-recipes"
          className="menu__search-input"
          placeholder="Search a recipe (by default, only some are shown)"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MenuSearch;
