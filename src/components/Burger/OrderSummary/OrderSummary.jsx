import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  state = {};
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>This delicious Burger has the following Ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout</p>
        <Button btnType="Danger" clicked={this.props.purchasedCanceled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchasedContinue}>
          Continue
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
