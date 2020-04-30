import React from 'react';
// import classes from './OrderSummary.module.css';
import Aux from '../../../hoc/Auxillary';

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
        </Aux>
    )
};

export default orderSummary;