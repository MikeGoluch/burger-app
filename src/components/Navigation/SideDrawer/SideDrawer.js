import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';


const sideDrawer = (props) => {
    let addedClass = [classes.SideDrawer, classes.Close];
    if (props.open) {
        addedClass = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxillary>
            <div className={classes.Backdrop}>
                <Backdrop
                    display={props.open}
                    orderCanceled={props.close} />
            </div>
            <div className={addedClass.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxillary>
    )
};

export default sideDrawer;