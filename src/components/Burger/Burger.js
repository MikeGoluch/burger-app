import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.module.css';

const burger = (props) => {
    let convertedIngredients = Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((amount, index) => {
            return <BurgerIngredient key={ingredient + index} type={ingredient} />
        })
    });
    const reducedIngredientsArray = convertedIngredients.reduce((acc, cur) => {
        return acc.concat(cur);
    }, []);

    if (reducedIngredientsArray.length === 0) {
        convertedIngredients = <p>Start adding the ingredients</p>
    }
    console.log(reducedIngredientsArray)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {convertedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger