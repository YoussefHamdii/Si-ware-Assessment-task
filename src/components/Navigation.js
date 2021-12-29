import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const pagesArray = [
  { name: "Company List", link: "/" },
  { name: "Add Company", link: "/company/add" },
];

function Navigation() {
  const [selected, setSelected] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialLocation = pagesArray.find(
      (navItem) => navItem.link === location.pathname
    );
    const locationIndex = pagesArray.indexOf(initialLocation);

    setSelected(locationIndex);
  }, []);

  const clickHandler = (index) => {
    setSelected(index);
    const link = pagesArray[index].link;
    navigate(link);
  };

  const displayNavItems = () => {
    return pagesArray.map((navItem, index) => (
      <li
        className={
          selected === index
            ? "navigation-item navigation-item-selected"
            : "navigation-item"
        }
        onClick={() => clickHandler(index)}
      >
        {navItem.name}
      </li>
    ));
  };

  return (
    <div className="navigation-container">
      <ul className="navigation-list">{displayNavItems()}</ul>
    </div>
  );
}

export default Navigation;
