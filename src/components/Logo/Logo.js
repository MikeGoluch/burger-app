import React from 'react';
import classes from './Logo.module.css';

import appLogo from '../../assets/images/logo_83_56.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={appLogo} alt="logo"></img>
    </div>
);

export default logo;