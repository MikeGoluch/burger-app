import * as actionType from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: false,
    sendOrderLoading: false,
    ordered: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INIT_ORDER_REQUEST:
            return {
                ...state,
                ordered: false
            }
        case actionType.POST_ORDER_REQUEST_START:
            return {
                ...state,
                sendOrderLoading: true
            }
        case actionType.POST_ORDER_REQUEST_SUCCESS:
            const completeOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(completeOrder),
                error: false,
                sendOrderLoading: false,
                ordered: true

            };
        case actionType.POST_ORDER_REQUEST_FAIL:
            return {
                ...state,
                sendOrderLoading: false,
                error: false
            };
        // case actionType.INIT_GET_ORDERS_REQUEST:
        //     return {
        //         ...state,
        //         sendOrderLoading: true,
        //     }
        case actionType.GET_ORDERS_REQUEST_START:
            return {
                ...state,
                sendOrderLoading: true,
            }
        case actionType.GET_ORDERS_REQUEST_SUCCESS:
            return {
                ...state,
                sendOrderLoading: false,
                orders: state.orders.concat(action.orders)
            }
        case actionType.GET_ORDERS_REQUEST_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default orderReducer;