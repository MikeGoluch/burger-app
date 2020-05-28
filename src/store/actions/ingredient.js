import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredient
    }
};
export const deductIngredient = (ingredient) => {
    return {
        type: actionTypes.DEDUCT_INGREDIENT,
        ingredientName: ingredient
    }
};

const initialIngredientsSetup = (ingredients) => {
    return {
        type: actionTypes.SET_INIT_INGREDIENTS,
        ingredients: ingredients
    }
};

const fetchFailedError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
    }
}

export const setInitIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-app-51744.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(initialIngredientsSetup(response.data))
            })
            .catch(error => {
                dispatch(fetchFailedError())
            })
    }
};