import React, {Component} from "react";
import Aux from "../../hoc/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-orders.js";

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
      ingredients: null,
      totalPrice: 2,
      isPurchasable: false,
      isBeingPurchased: false,
      loading: false
    }
  }
  
  async componentDidMount() {
    try {
      const ingredients = await axios.get("https://burger-builder-72d98.firebaseio.com/ingredients.json");
      console.log(ingredients);
      this.setState({ingredients: ingredients.data});
    } catch(error) {
      console.log(error);
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
  
  continuePurchaseHandler = async () => {
    this.setState({loading: true});
    
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Jakub",
        address: {
          street: "Test123",
          zipCode: "12345",
          country: "Poland"
        },
        email: "test@test.com"
      },
      deliveryMethod: "Fast"
    };
    
    try {
      const response = await axios.post("/orders.json", order);
      this.setState({loading: false, isBeingPurchased: false});
      console.log(response);
    } catch(error) {
      this.setState({loading: false, isBeingPurchased: false});
      console.log(error);
    }
  }
  
  render() {
    const disabledInfo = {...this.state.ingredients};
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null;
    
    let burger = <Spinner />;
    
    if(this.state.ingredients) {
      burger = (
        <Aux> 
          <Burger ingredients={this.state.ingredients} />
              <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler} 
                disabled={disabledInfo} price={this.state.totalPrice}
                purchasable={this.state.isPurchasable}
                ordered={this.isBeingPurchasedHandler}
              />
        </Aux>);
        
      orderSummary = <OrderSummary ingredients={this.state.ingredients}
              purchaseCancelled={this.cancelPurchaseHandler} 
              purchaseContinue={this.continuePurchaseHandler} 
              price={this.state.totalPrice}
            /> ;
    }
    
    if(this.state.loading) {
      orderSummary = <Spinner />;
    }
    
    return (
        <Aux>
          <Modal show={this.state.isBeingPurchased} closeModal={this.cancelPurchaseHandler} > 
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);