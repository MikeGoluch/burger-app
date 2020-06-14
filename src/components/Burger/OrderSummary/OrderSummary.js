import React from 'react';
import classes from './OrderSummary.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const summary = Object.keys(props.ingredientsSummary).map((cur, index) => (
        <li key={index}>{cur} : {props.ingredientsSummary[cur]}</li>
    ));
    return (
        <Aux styles={classes.OrderSummary}>
            <h3>ORDER SUMMARY</h3>
            <p>Your burger contains selected ingredients:</p>
            <ul>
                {summary}
            </ul>
            <p>Your current price is: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Would You like to checkout?</p>
            <div className={classes.Buttons}>
                <Button clicked={props.cancelOrder}><i class="far fa-times-circle"></i></Button>
                <Button clicked={props.continueOrder}><i class="far fa-check-circle"></i></Button>
            </div>
        </Aux>
    )
};


export default orderSummary;