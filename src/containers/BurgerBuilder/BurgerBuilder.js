import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        isOrderAvailable: false,
        isOrderClicked: false,
        isOrderCanceled: false,
    }

    componentDidMount() {
        this.props.onInitSetup()
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const newCount = oldCount + 1;
    //     const newIng = { ...this.props.ings };
    //     newIng[type] = newCount;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + INGREDIENT_PRICES[type]
    //     this.setState({
    //         ingredients: newIng,
    //         totalPrice: newPrice
    //     });
    //     this.disableOrderBtnHandler(newIng);
    // }

    // deductIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0) {
    //         return oldCount;
    //     }
    //     const newCount = oldCount - 1;
    //     const newIng = { ...this.props.ings };
    //     newIng[type] = newCount;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - INGREDIENT_PRICES[type]
    //     this.setState({
    //         ingredients: newIng,
    //         totalPrice: newPrice
    //     });
    //     this.disableOrderBtnHandler(newIng);
    // }

    disableOrderBtnHandler = (ingredients) => {
        const ingredientsVal = Object.values(ingredients);
        const sum = ingredientsVal.reduce((acc, cur) => {
            return acc + cur;
        }, 0);
        return sum > 0;
    }

    makeOrderHandler = () => {
        this.setState({
            isOrderClicked: true
        })
    }

    cancelOrderHandler = () => {
        this.setState({
            isOrderClicked: false,
            isOrderCanceled: false
        })
    }

    continueOrderHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(i + '=' + this.props.ings[i])
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        this.props.onOrderInit();
        this.props.history.push('/checkout')
    }

    render() {
        let burger = this.props.errorMessage ? <p>Ingredient's can't be loaded...</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ings) {
            burger = (
                <Auxillary>
                    <div>
                        <Burger ingredients={this.props.ings} />
                    </div>
                    <div>
                        <BurgerControls
                            addIngredient={this.props.onAddIngredient}
                            deductIngredient={this.props.onDeductIngredient}
                            disableLessBtn={this.props.ings}
                            disableOrderBtn={this.disableOrderBtnHandler(this.props.ings)}
                            burgerPrice={this.props.price}
                            makeOrder={this.makeOrderHandler} />
                    </div>
                </Auxillary>);
            orderSummary = (
                <OrderSummary
                    ingredientsSummary={this.props.ings}
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.continueOrderHandler}
                    price={this.props.price} />
            )
        }
        return (
            <Auxillary>
                <Modal
                    displayModal={this.state.isOrderClicked}
                    cancelOrder={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ing.ingredients,
        price: state.ing.totalPrice,
        error: state.ing.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingType) => dispatch(actionCreator.addIngredient(ingType)),
        onDeductIngredient: (ingType) => dispatch(actionCreator.deductIngredient(ingType)),
        onInitSetup: () => dispatch(actionCreator.setInitIngredients()),
        onOrderInit: () => dispatch(actionCreator.initOrderRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));