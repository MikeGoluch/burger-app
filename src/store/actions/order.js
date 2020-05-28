import * as actionTypes from './actionTypes';
import axios from '../../axios-config';


const orderRequest = (id, orderData) => {
    return {
        type: actionTypes.POST_ORDER_REQUEST_SUCCESS,
        orderData: orderData,
        orderId: id
    }
};

const failedOrderRequest = (error) => {
    return {
        type: actionTypes.POST_ORDER_REQUEST_FAIL,
        error: error
    }
};

const sendOrderRequestStart = () => {
    return {
        type: actionTypes.POST_ORDER_REQUEST_START
    }
};

export const sendOrderRequest = (orderData) => {
    return dispatch => {
        dispatch(sendOrderRequestStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response)
                dispatch(orderRequest(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(failedOrderRequest(error))
            });
    }
};

export const initOrderRequest = () => {
    return {
        type: actionTypes.INIT_ORDER_REQUEST
    }
};

const ordersFetched = (fetchedOrders) => {
    return {
        type: actionTypes.GET_ORDERS_REQUEST_SUCCESS,
        orders: fetchedOrders
    }
}

const failedFetchOrders = (error) => {
    return {
        type: actionTypes.GET_ORDERS_REQUEST_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDERS_REQUEST_START
    }
}

export const fetchOrdersRequest = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('orders.json')
        .then(response => {
            console.log(response.data);
            const data = [];
            for(let obj in response.data) {
                // console.log(response.data[obj])
                data.push({
                    ...response.data[obj],
                    id: obj
                })
                console.log(data)
            }
            dispatch(ordersFetched(data))
        })
        .catch(error => {
            dispatch(failedFetchOrders(error))
        })
    }
}