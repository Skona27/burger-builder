import React from "react";

import Aux from "../../../hoc/Aux";

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
      <p>Do you want to checkout?</p>
    </Aux>  
  )
}

export default orderSummary;