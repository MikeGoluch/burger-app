import React, { Component } from 'react';
import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(null, error => {
                this.setState({
                    error: error
                });
            });
        }

        componentWillUnmount() {
            console.log('[withErrorHandler] componentWillUnmount', this.requestInterceptor, this.responseInterceptor)
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        cancelErrorModalScreen = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Auxillary>
                    <Modal displayModal={this.state.error} cancelOrder={this.cancelErrorModalScreen}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            );
        }
    }
};

export default withErrorHandler;