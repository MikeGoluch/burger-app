import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Auxillary from '../../hoc/Auxillary';


class Layout extends Component {
    state = {
        isSideDrawerOpened: true
    }

    sideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpened: false
        })
    }

    toggleMenuHandler = () => {
        this.setState((prevState) => {
            return {isSideDrawerOpened: !prevState.isSideDrawerOpened};
        })
    }

    render() {
        return (
            <Auxillary>
                <div>
                    <Toolbar toggleMenu={this.toggleMenuHandler}/>
                    <SideDrawer 
                        open={this.state.isSideDrawerOpened}
                        close={this.sideDrawerHandler}/>
                </div>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
};


export default Layout;