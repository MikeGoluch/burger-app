import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let element = null
    switch (props.elementtype) {
        case ('input'):
            element = <input
                className={classes.InputElement}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            element = <textarea
                className={classes.InputElement}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            element = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementconfig.options.map((option, index) => (
                        <option key={index} value={option} > {option}</option>
                    )
                    )}
                </select >
            );
            break;
        default:
            element = <input
                className={classes.InputElement}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            {element}
        </div>
    );
};

export default input;