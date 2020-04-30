import React from 'react';
import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';


const modal = (props) => {
    return (
        <Auxillary>
            <Backdrop 
                orderCanceled={props.cancelOrder}
                display={props.makeOrder}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.makeOrder ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.makeOrder ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxillary>
    )
};

export default modal;