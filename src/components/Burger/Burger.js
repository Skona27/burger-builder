import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // we create an array of burger ingredients
  let ingredients = Object.keys(props.ingredients).map(
    ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((el, ind) => {
        return <BurgerIngredient key={ingredientKey +"-"+ ind} type={ingredientKey} />
      });
    }).reduce((prevEl, currEl) => [...prevEl, ...currEl], []);
  
  if(ingredients.length === 0) {
    ingredients = <p>Please start adding the ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;