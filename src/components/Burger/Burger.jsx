import React from "react";

import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredients key={igKey + i} type={igKey} />;
    });
  });
  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
