import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Authentication.module.css';
import FormErrors from '../../containers/Checkout/ContactData/FormErrors/FormErrors';
const rfdc = require('rfdc')();


class Authentication extends Component {
    inputConfig = (labelName, elementType, elementConfig, val) => {
        return (
            {
                label: labelName,
                elType: elementType,
                elConfig: { ...elementConfig },
                value: val === 'undefined' ? '' : val,
                touched: false,
                formErrors: '',
                elementValidity: false
            }
        );
    }
    state = {
        user: {
            email: this.inputConfig('E-mail', 'input', { placeholder: 'Your Email', type: 'email' }),
            password: this.inputConfig('Password', 'input', { placeholder: 'Your password', type: 'password' })
        },
        formValid: true,
    };

    validateInputField = (fieldName, value) => {
        const clonedCustomerArr = rfdc(this.state.user);
        switch (fieldName) {
            case 'password':
                clonedCustomerArr[fieldName].elementValidity = value.length >= 6;
                clonedCustomerArr[fieldName].formErrors = clonedCustomerArr[fieldName].elementValidity ? '' : ' is too short';
                break;
            case 'email':
                const regex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                clonedCustomerArr[fieldName].elementValidity = regex.test(value);
                clonedCustomerArr[fieldName].formErrors = clonedCustomerArr[fieldName].elementValidity ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            user: clonedCustomerArr
        }, this.validateForm);
    }



    validateForm = () => {
        const booleanVal = [];
        for (let key in this.state.user) {
            booleanVal.push(this.state.user[key].elementValidity)
        }
        console.log(booleanVal)
        const isValid = booleanVal.indexOf(false) === -1 ? false : true;
        this.setState({ formValid: isValid });
    }

    inputChangedHandler = (event, inputElement) => {
        const clonedArray = rfdc(this.state.user);
        clonedArray[inputElement].value = event.target.value;
        clonedArray[inputElement].touched = true;
        this.setState(
            { user: clonedArray },
            () => { this.validateInputField(inputElement, clonedArray[inputElement].value) }
        );
    }

    render() {
        const arr = [];
        const updatedCustomerObject = rfdc(this.state.user);
        for (let input in updatedCustomerObject) {
            arr.push({ config: updatedCustomerObject[input], key: input })
        }
        const inputs = arr.map((input, index) => (
            <Input
                key={index}
                elementtype={input.config.elType}
                elementconfig={input.config.elConfig}
                value={input.config.value}
                isValid={input.config.elementValidity}
                startInput={input.config.touched}
                label={input.config.label}
                error={input.config.formErrors}
                changed={(event) => this.inputChangedHandler(event, input.key)} />
        ))

        let form = (
            <div className={classes.Form}>
                <form>
                    {inputs}
                    <button
                        disabled={this.state.formValid}
                        clicked={(event) => this.completeOrderHandler(event)}
                        className={classes.OrderBtn}>ORDER</button>
                </form>
            </div>
        );
        // if (this.props.loading) {
        //     form = <Spinner />;
        // }
        return (
            <div>
                {form}
            </div>
        );
    };
};

export default Authentication;