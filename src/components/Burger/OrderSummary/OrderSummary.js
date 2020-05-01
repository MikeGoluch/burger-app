import React from 'react';
// import classes from './OrderSummary.module.css';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const summary = Object.keys(props.ingredientsSummary).map((cur, index) => (
        <li key={index}>{cur}:{props.ingredientsSummary[cur]}</li>
    ));
    return (
        <Aux>
            <h3>Your order summary</h3>
            <ul>
                {summary}
            </ul>
            <p>Your current price is: {props.price.toFixed(2)}</p>
            <p>Would You like to checkout?</p>
            <Button btnType={'Danger'} clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continueOrder}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;