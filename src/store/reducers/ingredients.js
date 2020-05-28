import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    sendOrderLoading: false,
    errorMessage: false
};

const INGREDIENT_PRICES = {
    cheese: 0.2,
    meat: 1.1,
    salad: 0.1,
    bacon: 0.8
}


const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            }
        case actionType.DEDUCT_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            }
        case actionType.SET_INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 2,
                // sendOrderLoading: true,
                errorMessage: false

            }
        case actionType.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                errorMessage: false
            }
        default:
            return state;
    }
}

export default ingredientReducer;