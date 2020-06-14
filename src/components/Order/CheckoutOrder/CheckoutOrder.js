import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutOrder.module.css';
import Button from '../../UI/Button/Button';

const checkoutOrder = (props) => {
    return (
        <div className={classes.CheckoutOrder}>
            <h1>Enjoy Your burger!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
                <Button
                    clicked={props.checkoutCancelled}
                    ><i class="far fa-times-circle" /></Button>
                <Button
                    clicked={props.checkoutContinued}
                    ><i class="far fa-check-circle" /></Button>
            </div>
        </div>
    )
};

export default checkoutOrder;