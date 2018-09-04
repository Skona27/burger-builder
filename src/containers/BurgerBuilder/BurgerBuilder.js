import React, {Component} from "react";
import Aux from "../../hoc/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
      totalPrice: 2
    }
  }
  
  addIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] += 1;
    
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  }
  
  removeIngredientHandler = type => {
    const updatedIngredients = {...this.state.ingredients};
    let newPrice = this.state.totalPrice;
    
    if(updatedIngredients[type] > 0) {
      updatedIngredients[type] -= 1;
      newPrice -= INGREDIENT_PRICES[type];
      this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }
  }
  
  render() {
    const disabledInfo = {...this.state.ingredients};
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    return (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler} 
            disabled={disabledInfo} 
          />
        </Aux>
    );
  }
}

export default BurgerBuilder;