import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-config';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import FormErrors from './FormErrors/FormErrors';
// import rdfc from 'rdfc';
const rfdc = require('rfdc')();



class ContactData extends Component {
    inputConfig = (elementType, elementConfig) => {
        const elType = elementType;
        const elConfig = { ...elementConfig };
        const value = ''
        return (
            { elType, elConfig, value }
        );
    }
    state = {
        customer: {
            name: this.inputConfig('input', { placeholder: 'Your Name', type: 'text' }),
            lastName: this.inputConfig('input', { placeholder: 'Your Lastname', type: 'text' }),
            email: this.inputConfig('input', { placeholder: 'Your Email', type: 'email' }),
            street: this.inputConfig('input', { placeholder: 'Street', type: 'text' }),
            zipCode: this.inputConfig('input', { placeholder: 'Your ZIP', type: 'text' }),
            phoneNumber: this.inputConfig('input', { placeholder: 'Your phone number', type: 'number' }),
            paymentMethod: this.inputConfig('select', { options: ['cash', 'credit card'] })
        },
        formErrors: { name: '', lastName: '', email: '', street: '', zipCode: '', phoneNumber: '' },
        elementValidity: { name: false, lastName: false, email: false, street: false, zipCode: false, phoneNumber: false },
        formValid: true,
        sendOrderLoading: false
    }


    validateField = (fieldName, value) => {
        let fieldValidationErrors = { ...this.state.formErrors };
        // let emailValid = this.state.emailValid;
        // let passwordValid = this.state.passwordValid;
        let elementValidation = this.state.elementValidity;
        console.log('fieldname', fieldName);
        console.log('value', value);
        switch (fieldName) {
            case 'name':
                elementValidation.name = value.length >= 3;
                fieldValidationErrors.name = elementValidation.name ? '' : ' is too short';
                break;
            case 'lastName':
                elementValidation.lastName = value.length >= 2;
                fieldValidationErrors.lastName = elementValidation.lastName ? '' : ' is too short';
                break;
            case 'email':
                elementValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = elementValidation.email ? '' : ' is invalid';
                break;
            case 'street':
                elementValidation.street = value.length >= 4;
                fieldValidationErrors.street = elementValidation.street ? '' : ' is too short';
                break;
            case 'zipCode':
                if (value.length < 5) {
                    fieldValidationErrors.zipCode = ' is too short';
                } else if (value.length > 5) {
                    fieldValidationErrors.zipCode = ' is too long';
                } else {
                    fieldValidationErrors.zipCode = '';
                    elementValidation.zipCode = true;
                }
                break;
            case 'phoneNumber':
                if (value.length < 9) {
                    fieldValidationErrors.phoneNumber = ' is too short';
                } else if (value.length > 9) {
                    fieldValidationErrors.phoneNumber = ' is too long';
                } else {
                    fieldValidationErrors.phoneNumber = '';
                    elementValidation.phoneNumber = true;
                }
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            elementValidity: elementValidation
        }, this.validateForm);
    }



    validateForm = () => {
        const booleanVal = [];
        for (let key in this.state.elementValidity) {
            booleanVal.push(this.state.elementValidity[key])
            console.log(booleanVal)
        }
        console.log('bv', booleanVal)
        const isValid = booleanVal.indexOf(false) === -1 ? false : true;
        console.log(isValid)
        this.setState({ formValid: isValid });
    }

    completeOrderHandler = (event) => {
        event.preventDefault();
        const formInputData = {};
        for (let inputElement in this.state.customer) {
            formInputData[inputElement] = this.state.customer[inputElement].value;
        }
        console.log('fid', formInputData)
        this.setState({
            sendOrderLoading: true
        })
        const order = {
            customer: formInputData,
            ingredients: {
                cheese: this.props.ingredients.cheese,
                meat: this.props.ingredients.meat,
                salad: this.props.ingredients.salad,
                bacon: this.props.ingredients.bacon
            },
            totalPrice: this.props.totalPrice
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ sendOrderLoading: false });
                this.props.history.push('/burger-builder')
            })
            .catch(error => this.setState({
                sendOrderLoading: false,
            }));
    }

    inputChangedHandler = (event, inputElement) => {
        // console.log('val', event.target.value);
        // console.log('name', event.target.name);
        const clonedArray = rfdc(this.state.customer);
        // console.log(clonedArray)
        clonedArray[inputElement].value = event.target.value;
        this.setState(
            { customer: clonedArray },
            () => { this.validateField(inputElement, clonedArray[inputElement].value) }
        );
    }

    render() {
        const arr = [];
        for (let input in this.state.customer) {
            // console.log('input', input)
            // console.log('inpuValue', this.state.customer[input])
            arr.push({ config: this.state.customer[input], key: input })
        }
        const inputs = arr.map((cur, index) => (
            <Input
                key={index}
                elementtype={cur.config.elType}
                elementconfig={cur.config.elConfig}
                value={cur.config.value}
                changed={(event) => this.inputChangedHandler(event, cur.key)} />
        ))

        let form = (
            <div>
                <form>
                    {inputs}
                    <FormErrors formErrors={this.state.formErrors} />
                    <Button
                        btnType="Success"
                        clicked={this.completeOrderHandler}
                        disabled={this.state.formValid}>ORDER</Button>
                </form>
            </div>
        );
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {this.state.sendOrderLoading ? <Spinner /> : form}
            </div>
        )
    }
};

export default ContactData;