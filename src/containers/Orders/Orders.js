import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-config';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchedOrders();
        // axios.get('orders.json')
        // .then(response => {
        //     console.log(response.data);
        //     const data = [];
        //     for(let obj in response.data) {
        //         // console.log(response.data[obj])
        //         data.push({
        //             ...response.data[obj],
        //             id: obj
        //         })
        //         console.log(data)
        //     }
        //     this.setState(() => (
        //         {orders: data}
        // ))
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = (
                this.props.orders.map((cur) => {
                    return <Order
                        key={cur.id}
                        ingredients={cur.ingredients}
                        price={cur.totalPrice} />
                })
            )
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.sendOrderLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders: () => dispatch(actionCreator.fetchOrdersRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));