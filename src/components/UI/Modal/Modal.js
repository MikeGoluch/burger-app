import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.display !== this.props.display
    }

    render() {
        return (
            <Auxillary>
                <Backdrop 
                    orderCanceled={this.props.cancelOrder}
                    display={this.props.makeOrder}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.makeOrder ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.makeOrder ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxillary>
        )

    }
};

export default Modal;