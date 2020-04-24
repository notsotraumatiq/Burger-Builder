import React from "react";
import classes from "./Order.module.css";
const order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad {1}</p>
      <p>
        TotalPrice: <strong>{4} Dollars</strong>
      </p>
    </div>
  );
};

export default order;
