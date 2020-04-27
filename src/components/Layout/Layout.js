import React from 'react';
import classes from './Layout.module.css';

import Auxillary from '../../hoc/Auxillary';


const layout = (props) => (
    <Auxillary>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classes.Container}>
            {props.children}
        </main>
    </Auxillary>
);

export default layout;