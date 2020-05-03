import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggle from '../Toolbar/MenuToggle/MenuToggle';


const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.MenuToggle}>
                <MenuToggle clicked={props.toggleMenu}/>
            </div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.Navigation}>
                <NavigationItems />
            </nav>
        </header>
    )
};

export default toolbar;