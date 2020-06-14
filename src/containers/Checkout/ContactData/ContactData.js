import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-config';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import FormErrors from './FormErrors/FormErrors';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
const rfdc = require('rfdc')();



class ContactData extends Component {
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
        customer: {
            name: this.inputConfig('Name', 'input', { placeholder: 'Your Name', type: 'text' }),
            lastName: this.inputConfig('Last name', 'input', { placeholder: 'Your Lastname', type: 'text' }),
            email: this.inputConfig('E-mail', 'input', { placeholder: 'Your Email', type: 'email' }),
            street: this.inputConfig('Street', 'input', { placeholder: 'Street', type: 'text' }),
            zipCode: this.inputConfig('Zip code', 'input', { placeholder: 'Your ZIP', type: 'text' }),
            phoneNumber: this.inputConfig('Phone number', 'input', { placeholder: 'Your phone number', type: 'number' }),
            paymentMethod: this.inputConfig('Payment method', 'select', { options: ['cash', 'credit card'] }, 'cash')
        },
        formValid: true,
    }


    validateInputField = (fieldName, value) => {
        const clonedCustomerArr = rfdc(this.state.customer);
        switch (fieldName) {
            case 'name':
                clonedCustomerArr[fieldName].elementValidity = value.length >= 3;
                clonedCustomerArr[fieldName].formErrors = clonedCustomerArr[fieldName].elementValidity ? '' : ' is too short';
                break;
            case 'lastName':
                clonedCustomerArr[fieldName].elementValidity = value.length >= 2;
                clonedCustomerArr[fieldName].formErrors = clonedCustomerArr[fieldName].elementValidity ? '' : ' is too short';
                break;
            case 'email':
                const regex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                clonedCustomerArr[fieldName].elementValidity = regex.test(value);
                clonedCustomerArr[fieldName].formErrors = clonedCustomerArr[fieldName].elementValidity ? '' : ' is invalid';
                break;
            case 'street':
                clonedCustomerArr[fieldName].elementValidity = value.length >= 4;
                clonedCustomerArr[fieldName].formErrors = clonedCustomerArr[fieldName].elementValidity ? '' : ' is too short';
                break;
            case 'zipCode':
                if (value.length < 5) {
                    clonedCustomerArr[fieldName].formErrors = ' is too short';
                } else if (value.length > 5) {
                    clonedCustomerArr[fieldName].formErrors = ' is too long';
                } else {
                    clonedCustomerArr[fieldName].formErrors = '';
                    clonedCustomerArr[fieldName].elementValidity = true;
                }
                break;
            case 'phoneNumber':
                if (value.length < 9) {
                    clonedCustomerArr[fieldName].formErrors = ' is too short';
                } else if (value.length > 9) {
                    clonedCustomerArr[fieldName].formErrors = ' is too long';
                } else {
                    clonedCustomerArr[fieldName].formErrors = '';
                    clonedCustomerArr[fieldName].elementValidity = true;
                }
                break;
            default:
                break;
        }
        this.setState({
            customer: clonedCustomerArr
        }, this.validateForm);
    }



    validateForm = () => {
        const booleanVal = [];
        for (let key in this.state.customer) {
            booleanVal.push(this.state.customer[key].elementValidity)
        }
        console.log(booleanVal)
        const isValid = booleanVal.splice(0, booleanVal.length - 1).indexOf(false) === -1 ? false : true;
        this.setState({ formValid: isValid });
    }

    completeOrderHandler = (event) => {
        event.preventDefault();
        const formInputData = {};
        for (let inputElement in this.state.customer) {
            formInputData[inputElement] = this.state.customer[inputElement].value;
        }
        this.setState({
            sendOrderLoading: true
        })
        const order = {
            customer: formInputData,
            ingredients: this.props.ings,
            totalPrice: this.props.price
        }

        this.props.onSendRequest(order);
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ sendOrderLoading: false });
        //         this.props.history.push('/burger-builder')
        //     })
        //     .catch(error => this.setState({
        //         sendOrderLoading: false,
        //     }));
    }

    inputChangedHandler = (event, inputElement) => {
        const clonedArray = rfdc(this.state.customer);
        clonedArray[inputElement].value = event.target.value;
        clonedArray[inputElement].touched = true;
        this.setState(
            { customer: clonedArray },
            () => { this.validateInputField(inputElement, clonedArray[inputElement].value) }
        );
    }

    render() {
        const arr = [];
        const updatedCustomerObject = rfdc(this.state.customer);
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
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>ENTER YOUR CONTACT DATA</h4>
                {this.props.loading ? <Spinner /> : form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ing.ingredients,
        price: state.ing.totalPrice,
        loading: state.order.sendOrderLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSendRequest: (orderData) => dispatch(actionCreator.sendOrderRequest(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));