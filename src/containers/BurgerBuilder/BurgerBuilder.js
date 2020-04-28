import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        }
    }

    render() {
        return (
            <Auxillary>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>
                    Build Controls
                </div>
            </Auxillary>
        )
    }
};

export default BurgerBuilder;