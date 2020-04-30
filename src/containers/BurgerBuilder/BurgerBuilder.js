import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from'../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    cheese: 0.2,
    meat: 1.1,
    salad: 0.1,
    bacon: 0.8
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 0,
        isOrderAvailable: false,
        isOrderClicked: false,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIng = {...this.state.ingredients};
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
        const newIng = {...this.state.ingredients};
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
            isOrderClicked: false
        })
    }

    render() {
        return (
            <Auxillary>
                <Modal 
                    makeOrder={this.state.isOrderClicked}
                    cancelOrder={this.cancelOrderHandler}>
                    <OrderSummary ingredientsSummary={this.state.ingredients} />
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>
                    <BurgerControls 
                        addIngredient={this.addIngredientHandler}
                        deductIngredient={this.deductIngredientHandler}
                        disableLessBtn={this.state.ingredients}
                        disableOrderBtn={this.state.isOrderAvailable}
                        burgerPrice={this.state.totalPrice}
                        makeOrder={this.makeOrderHandler}/>
                </div>
            </Auxillary>
        )
    }
};

export default BurgerBuilder;