import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    cheese: 0.2,
    meat: 1.1,
    salad: 0.1,
    bacon: 0.8
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 2,
        isOrderAvailable: false,
        isOrderClicked: false,
        isOrderCanceled: false,
        sendOrderLoading: false,
        errorMessage: false
    }

    componentDidMount() {
        axios.get('https://react-burger-app-51744.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    errorMessage: true
                })
            })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIng = { ...this.state.ingredients };
        newIng[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type]
        this.setState({
            ingredients: newIng,
            totalPrice: newPrice
        });
        this.disableOrderBtnHandler(newIng);
    }

    deductIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return oldCount;
        }
        const newCount = oldCount - 1;
        const newIng = { ...this.state.ingredients };
        newIng[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type]
        this.setState({
            ingredients: newIng,
            totalPrice: newPrice
        });
        this.disableOrderBtnHandler(newIng);
    }

    disableOrderBtnHandler = (ingredients) => {
        console.log(this.state.isOrderAvailable)
        const ingredientsVal = Object.values(ingredients);
        const sum = ingredientsVal.reduce((acc, cur) => {
            return acc + cur;
        }, 0);
        this.setState({
            isOrderAvailable: sum > 0
        })
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(i + '=' + this.state.ingredients[i])
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        let burger = this.state.errorMessage ? <p>Ingredient's can't be loaded...</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = (
                <Auxillary>
                    <div>
                        <Burger ingredients={this.state.ingredients} />
                    </div>
                    <div>
                        <BurgerControls
                            addIngredient={this.addIngredientHandler}
                            deductIngredient={this.deductIngredientHandler}
                            disableLessBtn={this.state.ingredients}
                            disableOrderBtn={this.state.isOrderAvailable}
                            burgerPrice={this.state.totalPrice}
                            makeOrder={this.makeOrderHandler} />
                    </div>
                </Auxillary>);
            orderSummary = (
                <OrderSummary
                    ingredientsSummary={this.state.ingredients}
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.continueOrderHandler}
                    price={this.state.totalPrice} />
            )
        }
        if (this.state.sendOrderLoading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);