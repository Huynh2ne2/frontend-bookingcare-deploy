import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        // console.log('Huynh check params: ', this.props)
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            // console.log('Huynh check token and doctorId : ', token, doctorId);
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            });

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { statusVerify, errCode } = this.state;
        // console.log('Huynh check state: ', this.state)

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>Loading data...</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công!</div>
                                :
                                <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            }
                        </div>
                    }
                </div>


            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
