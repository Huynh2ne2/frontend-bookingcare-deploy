import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, patientMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.language !== this.props.language) {
    //         this.setState({
    //             language: this.props.language
    //         })

    //     }
    // }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     //so sánh hiện tại (this) và quá khứ (previous)
    //     //quá khứ: [], hiện tại [3]
    //      if(prevProps.this.props.changeLanguageAppRedux(LANGUAGES) !== this.props.changeLanguageAppRedux(LANGUAGES)){
    //          this.setState({
    //             language: this.props.changeLanguageAppRedux(LANGUAGES)
    //          })
    //      }
    //  }

    componentDidMount() {
        let { userInfo } = this.props;//hoặc this.props.userInfo
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            // console.log('Check role: ', role)
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
            if (role === USER_ROLE.PATIENT) {
                menu = patientMenu;
            }

        }
        this.setState({
            menuApp: menu,
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        // let language = this.props.language;
        // console.log('Check props language: ',this.props)

        const { processLogout, language, userInfo } = this.props;

        console.log('Check user info: ', userInfo)
        // console.log('Huynh check props form language: ', this.props.language)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    {/* <Navigator menus={adminMenu} /> */}
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}

                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    // onClick={(language) => this.componentDidUpdate(LANGUAGES.VI)}
                    >VN</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}

                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    // onClick={(language) => this.componentDidUpdate(LANGUAGES.EN)}
                    >EN</span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
