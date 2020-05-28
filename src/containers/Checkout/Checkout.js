import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutOrder from '../../components/Order/CheckoutOrder/CheckoutOrder';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // console.log(param)
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState(() => (
    //         { ingredients: ingredients, totalPrice: price }
    //     ))
    // }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const completeOrderRedirect = this.props.ordered ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {completeOrderRedirect}
                    <CheckoutOrder
                        ingredients={this.props.ings}
                        checkoutCancelled={this.cancelCheckoutHandler}
                        checkoutContinued={this.continueCheckoutHandler} />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ing.ingredients,
        price: state.ing.totalPrice,
        ordered: state.order.ordered
    }
};

export default connect(mapStateToProps)(Checkout);