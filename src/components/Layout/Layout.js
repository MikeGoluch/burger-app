import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import Auxillary from '../../hoc/Auxillary';


const layout = (props) => (
    <Auxillary>
        <div>
            <Toolbar />
        </div>
        <main className={classes.Container}>
            {props.children}
        </main>
    </Auxillary>
);

export default layout;