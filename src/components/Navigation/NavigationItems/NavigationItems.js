import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem>Burger Builder</NavigationItem>
        <NavigationItem>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;