import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
  { label: 'Bacon', type: 'bacon'},
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(control => (
        <BuildControl key={control.label} label={control.label}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
  )
}

export default buildControls;