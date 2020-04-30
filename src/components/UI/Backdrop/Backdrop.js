import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    return (
        props.display ? <div className={classes.Backdrop} onClick={props.orderCanceled}></div> : null
    )
};

export default backdrop;