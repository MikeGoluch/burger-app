import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.displayModal !== this.props.displayModal || nextProps.cancelOrder !== this.props.cancelOrder;
    }

    render() {
        return (
            <Auxillary>
                <Backdrop
                    orderCanceled={this.props.cancelOrder}
                    modalDisplayed={this.props.displayModal} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.displayModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.displayModal ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxillary>
        )

    }
};

export default Modal;