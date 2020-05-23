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
            <p>Current price: <strong>{props.burgerPrice.toFixed(2)}</strong></p>
            {buttons.map(ing => (
                <BurgerControl
                    key={ing.label}
                    label={ing.label}
                    added={() => props.addIngredient(ing.type)}
                    deducted={() => props.deductIngredient(ing.type)}
                    disabledLessBtn={props.disableLessBtn[ing.type] === 0 ? true : false} />
            ))}
            <button
                disabled={!props.disableOrderBtn}
                onClick={props.makeOrder}
                className={classes.OrderBtn}>ORDER</button>
        </div>
    )
};

export default burgerControls;