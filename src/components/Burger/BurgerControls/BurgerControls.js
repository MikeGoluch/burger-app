import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.module.css';

const buttons = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
];

const burgerControls = (props) => {
    return (
        <div className={classes.BurgerControls}>
            <p>CURRENT PRICE: <strong>{props.burgerPrice.toFixed(2)}</strong></p>
            {buttons.map(ingredient => (
                <BurgerControl
                    key={ingredient.label}
                    label={ingredient.label.toUpperCase()}
                    added={() => props.addIngredient(ingredient.type)}
                    deducted={() => props.deductIngredient(ingredient.type)}
                    disabledLessBtn={props.disableLessBtn[ingredient.type] === 0 ? true : false} />
            ))}
            <button
                disabled={!props.disableOrderBtn}
                onClick={props.makeOrder}
                className={classes.OrderBtn}>ORDER</button>
        </div>
    )
};

export default burgerControls;