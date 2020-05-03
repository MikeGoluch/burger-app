import React from 'react';

const auxillary = (props) => (
    <div className={props.styles}>
        {props.children}
    </div>
);

export default auxillary;