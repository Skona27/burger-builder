import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // we create an array of burger ingredients
  const ingredientsArr = Object.keys(props.ingredients).map(
    ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((el, ind) => {
        return <BurgerIngredient key={ingredientKey +"-"+ ind} type={ingredientKey} />
      });
    }  
  );
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {ingredientsArr}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;