import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import userActions from "../../store/actions/userActions";
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions/userActions';
import { withRouter } from 'react-router';

class Login extends Component {
    constructor(props) {//đây là một hàm tạo (constructor)
        super(props);//khi khai báo như thế này thì khi có đường truyền props xuống thì nó sẽ chạy được
        //cần khai báo
        //props
        this.state = {
            values: {
                email: '',
                password: '',
            },
            errors: {},
            isShowPassword: false,
            errMessage: ''
        }
    }

    // handleOnChangeUsername = (event) => {
    //     this.setState({
    //         username: event.target.value,
    //     })
    //     // console.log(event.target.value)
    // }
    // handleOnChangePassword = (event) => {
    //     this.setState({
    //         password: event.target.value,
    //     })
    //     // console.log(event.target.value)
    // }
    OnChangeInput = (event, id) => {
        this.setState({
            values: {
                ...this.state.values,
                [id]: event.target.value
            }
        });
    }

    handleKeyDown = (event) => {
        // console.log('huynh check key down: ', event);
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    handleLogin = async () => {
        // alert('Welcome Huynh!')
        // console.log('Username: ' +this.state.username)
        // console.log('Password: ' +this.state.password)
        // console.log('Username: ' ,this.state.username, 'password: ', this.state.password)
        // console.log('all state ', this.state)
        //tìm mã lỗi
        this.setState({
            errMessage: ''
        })//đoạn code này dùng để clear mã lỗi
        try {
            let data = await handleLoginApi(this.state.values.email, this.state.values.password);
            // console.log('huynh check : ', data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login succeed!!!');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('Huynh check err.response: ', error.response)
        }
    }


    hanldeShowHidePassWord = () => {
        //chỉnh lại
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    renderRegister = () => {
        if (this.props.history) {
            return this.props.history.push('/register')
        }
    }

    //khi component trước khi render thì nó sẽ chạy trong hàm tạo
    render() {
        //JSX
        let { email, password } = this.state.values;
        let { errors } = this.state;
        console.log('Huynh check prop: isLoggedIn ', this.props.isLoggedIn)

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Email</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                //cần đưa giá trị state vào
                                value={email}//nó chỉ hiển thị chứ không cho thay đổi, cần thêm một sự kiện
                                onChange={(event) => this.OnChangeInput(event, 'email')}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => this.OnChangeInput(event, 'password')}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span
                                    onClick={() => this.hanldeShowHidePassWord()}
                                >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >LOGIN</button>
                        </div>
                        {/* <div className="col-12"> */}
                        <div className='col-6'>
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className='col-6'
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.renderRegister()}
                        >
                            <span className='register'>Do you have account?</span>
                        </div>

                        {/* </div> */}
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-instagram instagram"></i>
                            <i className="fab fa-twitter twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        // userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
