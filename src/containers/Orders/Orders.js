import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-config';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],

    }
    componentDidMount() {
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
            this.setState(() => (
                {orders: data}
        ))
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        console.log('state',this.state.orders)
        console.log('stateIng',this.state.orders.ingredients)
        
        return (
            <div>
                {this.state.orders.map((cur) => {
                    return <Order key={cur.id} ingredients={cur.ingredients} price={cur.totalPrice}/>
                })}
            </div>
        )
    }
};

export default withErrorHandler(Orders, axios);