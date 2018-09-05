import React, {Component} from "react";
import Aux from "../../hoc/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 2,
      isPurchasable: false,
      isBeingPurchased: false
    }
  }
  
  addIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] += 1;
    
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    
    this.updatePurchaseState(updatedIngredients);
  }
  
  removeIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    let newPrice = this.state.totalPrice;
    
    if(updatedIngredients[type] > 0) {
      updatedIngredients[type] -= 1;
      newPrice -= INGREDIENT_PRICES[type];
      this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }
    
    this.updatePurchaseState(updatedIngredients);
  }
  
  updatePurchaseState = (updatedIngredients) => {
    const ingredients = {...updatedIngredients};
    const sum = Object.keys(ingredients)
      .map(ingredientKey => ingredients[ingredientKey])
      .reduce((acc, currEl) => acc + currEl, 0);
      
    this.setState({isPurchasable: sum > 0});
  }
  
  isBeingPurchasedHandler = () => {
    this.setState({isBeingPurchased: true});
  }
  
  cancelPurchaseHandler = () => {
    this.setState({isBeingPurchased: false});
  }
  
  continuePurchaseHandler = () => {
    alert("OK");
  }
  
  render() {
    const disabledInfo = {...this.state.ingredients};
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    return (
        <Aux>
          <Modal show={this.state.isBeingPurchased} closeModal={this.cancelPurchaseHandler} > 
            <OrderSummary ingredients={this.state.ingredients}
              purchaseCancelled={this.cancelPurchaseHandler} 
              purchaseContinue={this.continuePurchaseHandler} 
              price={this.state.totalPrice}
            /> 
          </Modal>
          
          <Burger ingredients={this.state.ingredients} />
          
          <BuildControls 
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler} 
            disabled={disabledInfo} price={this.state.totalPrice}
            purchasable={this.state.isPurchasable}
            ordered={this.isBeingPurchasedHandler}
          />
        </Aux>
    );
  }
}

export default BurgerBuilder;