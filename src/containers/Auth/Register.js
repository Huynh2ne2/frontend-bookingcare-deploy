import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";



import * as actions from "../../store/actions";

import userIcon from '../../../src/assets/images/user.svg';
import passIcon from '../../../src/assets/images/pass.svg';
import './Register.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';
import { values } from 'lodash';
import Validation from './Validation';

import { toast } from "react-toastify";

class Register extends Component {
    constructor(props) {//đây là một hàm tạo (constructor)
        super(props);//khi khai báo như thế này thì khi có đường truyền props xuống thì nó sẽ chạy được
        //cần khai báo
        //props
        this.state = {
            values: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
            },
            roleId: '',
            isShowPassword: false,
            errMessage: '',
            errors: {}
        }
    }

    handleKeyDown = (event) => {
        console.log('huynh check key down: ', event);
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleRegister();
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state.values[arrCheck[i]]) {
                isValid = false;
                toast.info('Missing input is required: ' + arrCheck[i])
                // alert('Missing input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }
    // handleRegister = async () => {
    //     let isValid = this.checkValidateInput();
    //     if (isValid === false)
    //         return;

    //     if (isValid ) {
    //         this.props.createNewUser({
    //             email: this.state.values.email,
    //             password: this.state.values.password,
    //             firstName: this.state.values.firstName,
    //             lastName: this.state.values.lastName,
    //             address: this.state.values.address,
    //             phoneNumber: this.state.values.phoneNumber,
    //             roleId: 'R3',
    //         })
    //         // this.props.history.push("/login");
    //     }

    // }

    handleRegister = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            const validation = new Validation();
            const errors = validation.render(this.state.values);
            if (Object.keys(errors).length === 1) {
                this.props.createNewUser({
                    email: this.state.values.email,
                    password: this.state.values.password,
                    firstName: this.state.values.firstName,
                    lastName: this.state.values.lastName,
                    address: this.state.values.address,
                    phoneNumber: this.state.values.phoneNumber,
                    roleId: 'R3',
                });
                this.props.history.push('/login')
            } else {
                this.setState({ errors });
            }
        }
    }


    OnChangeInput = (event, id) => {
        this.setState({
            values: {
                ...this.state.values,
                [id]: event.target.value
            }
        });
    }



    handleValidateForm = (event) => {
        event.preventDefault();
        const validation = new Validation();
        const errors = validation.render(this.state.values); // Pass the form values for validation
        this.setState({ errors }); // Update the errors in the state


    }

    hanldeShowHidePassWord = () => {
        //chỉnh lại
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }


    render() {
        console.log('Huynh check state: ', this.state);
        console.log('Huynh check props: isRegister ', this.props.isRegister)
        let { errors } = this.state;
        let { email, firstName, password, phoneNumber, address, lastName, roleId, loginError } = this.state.values;
        const { lang } = this.props;

        return (
            <div className="register-background">
                <div className="register-container">
                    <form
                        onSubmit={(event) => this.handleValidateForm(event)}
                    >
                        <div className="register-content row">
                            <div className="col-12 text-register">Register</div>
                            <div className="col-6 form-group register-input">
                                <label>First name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(event) => this.OnChangeInput(event, 'firstName')} />
                                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                            </div>
                            <div className="col-6 form-group register-input">
                                <label>Last name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    value={lastName}
                                    onChange={(event) => this.OnChangeInput(event, 'lastName')}

                                />
                                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>Email</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) => this.OnChangeInput(event, 'email')}
                                />
                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>Password</label>
                                <div className="custom-input-password">
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(event) => this.OnChangeInput(event, 'password')}

                                    />
                                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                                    <span
                                        onClick={() => this.hanldeShowHidePassWord()}
                                    >
                                        <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                    </span>

                                </div>
                            </div>


                            <div className="col-12 form-group register-input">
                                <label>Phone number</label>
                                <input type="number"
                                    className="form-control"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(event) => this.OnChangeInput(event, 'phoneNumber')}
                                />
                                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
                            </div>

                            <div className="col-12 form-group register-input">
                                <label>Address</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(event) => this.OnChangeInput(event, 'address')}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                            </div>

                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12 ">
                                <button
                                    className="btn-register"
                                    onClick={() => this.handleRegister()}
                                >Register</button>
                            </div>

                            <div className="col-12 social-register">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                                <i className="fab fa-instagram instagram"></i>
                                <i className="fab fa-twitter twitter"></i>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isRegister: state.user.isRegister
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
