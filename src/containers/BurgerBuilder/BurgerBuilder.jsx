import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    // Function
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            price={this.props.price}
            purchaseable={this.updatePurchaseHandler(this.props.ings)}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchasedCanceled={this.purchaseCancelHandler}
          purchasedContinue={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
