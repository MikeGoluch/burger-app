import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredient = [];
    for (let ing in props.ingredients) {
        console.log(ingredient);
        ingredient.push(`${ing}: ${props.ingredients[ing]} `)
    }
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredient}</p>
            <p>Price: {parseFloat(props.price).toFixed(2)}</p>
        </div>
    )
};

export default order;