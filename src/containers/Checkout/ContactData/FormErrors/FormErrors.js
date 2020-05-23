import React from 'react';
import classes from './FormErrors.module.css'

const formErrors = (props) => {
    const formErrors = props.formErrors;
    console.log('fe', formErrors)
    return (
        <div className={classes.FormErrors}>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (formErrors[fieldName].length > 0) {
                    return (
                        <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                    )
                } else {
                    return '';
                }
            })}
        </div>
    );
};

export default formErrors;