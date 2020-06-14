import React from 'react';
import classes from './FormErrors.module.css';
const rfdc = require('rfdc')();


const formErrors = (props) => {
    const formErrors = rfdc(props.formErrors);
    return (
        <div className={classes.FormErrors}>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].formErrors.length > 0) {
                    return (
                        <p key={i}>{formErrors[fieldName].label} {formErrors[fieldName].formErrors}</p>
                    )
                } else {
                    return '';
                }
            })}
        </div>
    );
};

export default formErrors;