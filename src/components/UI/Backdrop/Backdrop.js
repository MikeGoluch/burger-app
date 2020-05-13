import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    return (
        props.modalDisplayed ? <div className={classes.Backdrop} onClick={props.orderCanceled}></div> : null
    )
};

export default backdrop;