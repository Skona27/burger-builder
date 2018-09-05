import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => (
    <li key={ingredientKey}>
      <span style={{textTransform: "capitalize"}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
    </li>
  ));
  
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Please check the ingredients before finalizing order.</p>
      <ul>
        {ingredientSummary}
      </ul>
      <h4>Total price: ${props.price.toFixed(2)}</h4>
      <p>Do you want to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled} >CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinue} >CONTINUE</Button>
    </Aux>  
  )
}

export default orderSummary;