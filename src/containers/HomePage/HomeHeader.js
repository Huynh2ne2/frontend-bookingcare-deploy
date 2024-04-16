import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo_v3.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    // constructor(props){
    //     super(props);
    //     //khởi tạo các biến muốn dùng trong state
    //     //this này có nghĩa là class
    //     this.state = {
    //         languageRedux: ''
    //     }
    // }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    // componentDidUpdate(prevProps,prevState, snapshot){
    //     if(prevProps.language !== this.props.language){
    //         this.setState({
    //             languageRedux: this.props.language
    //         })
    //     }
    // }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }

    }

    renderLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }


    render() {
        let language = this.props.language;
        // console.log('Check language: ', language)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'>
                                <img src={logo}
                                    onClick={() => this.returnToHome()}
                                />
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div >
                                    <b><FormattedMessage id="homeheader.speciality" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div >
                                    <b><FormattedMessage id="homeheader.health-facility" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div >
                                    <b><FormattedMessage id="homeheader.doctor" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div >
                                    <b><FormattedMessage id="homeheader.fee" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"> </i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'languages-vi active' : 'languages-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'languages-en active' : 'languages-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            <div className='login'
                                onClick={() => this.renderLogin()}
                            >Login</div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm kiếm...' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.specialist-examination" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.remote-examination" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.general-examination" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.medical-tests" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.mental-health" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.dental-examination" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
