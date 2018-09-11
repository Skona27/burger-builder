import React from "react";
import classes from "./Order.css";

const order = props => {
    let ingredientsArray = []
      for (let key in props.ingredients) {
        ingredientsArray.push({name: key, amount: props.ingredients[key]})
      }
      
      const ingredientList = ingredientsArray.map((item) => {
        return (
          <span key={item.name}>
            <strong>
              {item.name}
            </strong>
             ({item.amount})
          </span>
        )
    })
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientList}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;