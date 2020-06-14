import React from 'react';
import classes from './Input.module.css';
import FormErrors from '../../../containers/Checkout/ContactData/FormErrors/FormErrors';

const input = (props) => {
    let element = null
    const error = !props.isValid && props.startInput ? 'HasError' : '';
    switch (props.elementtype) {
        case ('input'):
            element = (
                <div className={classes.Input}>
                    <label>{props.label}</label>
                    <input
                        className={[classes.InputElement, classes[error]].join(' ')}
                        {...props.elementconfig}
                        value={props.value}
                        onChange={props.changed} />
                    <p>{props.error.length > 0 ? props.label + props.error : ''}</p>
                </div>);
            return element;
        case ('textarea'):
            element = <textarea
                className={classes.InputElement}
                {...props.elementconfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            element = (
                <div>
                    <label>{props.label}</label>
                    <select
                        className={classes.InputElement}
                        value={props.value}
                        onChange={props.changed} >
                        {props.elementconfig.options.map((option, index) => (
                            <option key={index} value={option} > {option}</option>
                        )
                        )}
                    </select >
                </div>
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