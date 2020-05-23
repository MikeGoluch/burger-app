import React from 'react';
import classes from './BurgerControl.module.css';

const burgerControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <p className={classes.Label}>{props.label}</p>
            <button
                className={classes.Less}
                onClick={props.deducted}
                disabled={props.disabledLessBtn}>Less</button>
            <button
                className={classes.More}
                onClick={props.added}>More</button>
        </div>
    )
};

export default burgerControl;