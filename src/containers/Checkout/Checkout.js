import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutOrder from '../../components/Order/CheckoutOrder/CheckoutOrder';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // console.log(param)
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState(() => (
            { ingredients: ingredients, totalPrice: price }
        ))
    }

    render() {
        return (
            <div>
                <CheckoutOrder
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.cancelCheckoutHandler}
                    checkoutContinued={this.continueCheckoutHandler} />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={() => <ContactData {...this.props}
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice} />} />
            </div>
        )
    }
};

export default Checkout;