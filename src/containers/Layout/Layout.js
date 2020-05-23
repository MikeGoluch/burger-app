import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auxillary from '../../hoc/Auxillary/Auxillary';


class Layout extends Component {
    state = {
        isSideDrawerOpened: true
    }

    componentDidMount() {
        console.log('[Layout] ComponentDidMount')
    }

    sideDrawerHandler = () => {
        this.setState({
            isSideDrawerOpened: false
        })
    }

    toggleMenuHandler = () => {
        this.setState((prevState) => {
            return { isSideDrawerOpened: !prevState.isSideDrawerOpened };
        })
    }

    render() {
        return (
            <Auxillary>
                <div>
                    <Toolbar toggleMenu={this.toggleMenuHandler} />
                    <SideDrawer
                        open={this.state.isSideDrawerOpened}
                        close={this.sideDrawerHandler} />
                </div>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
};


export default Layout;