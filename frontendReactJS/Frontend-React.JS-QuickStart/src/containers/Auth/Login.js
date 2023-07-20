import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FaFacebook, FaGooglePlusG } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handleLoginApi } from '../../services/userService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "hoi dan it",
            password: "Password",
            isShowPassword: false,
        }
    }


    handleOnChangeUsername = (event) => {
        // console.log(event.target.value)
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        // console.log(event.target.value)
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        console.log(this.state)
        console.log(this.state.password)
        try {
            await handleLoginApi(this.state.username, this.state.password)
        }
        catch (e) {
            console.log(e)
        }
    }

    handleHiddenPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            Login
                        </div>
                        <div className='col-12 form-group login-input' >
                            <label>
                                Username:
                            </label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input' >
                            <label>
                                Password:
                            </label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                    value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)}></input>
                                <div className='hidden-passwd' onClick={() => this.handleHiddenPassword()}><AiFillEye /></div>

                            </div>
                        </div>
                        <div className='col-12  '>
                            <button className='btn-login'
                                onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>
                        <div className='col-12 '>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 custom-login'>
                            <span className='text-other-login '> Or login with: </span>
                        </div>
                        <div className='col-12 social-login' >
                            <div className='facebook'><FaFacebook /></div>
                            <div className='google'> <FaGooglePlusG /> </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
