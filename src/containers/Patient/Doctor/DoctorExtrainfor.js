import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './DoctorExtrainfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService';
import NumericFormat from 'react-number-format';


class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }


    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);

            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }



    render() {
        let { language } = this.props;
        let { isShowDetailInfor, extraInfor } = this.state;
        // console.log('Huynh check data extra from backend: ', this.state)
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.address-clinic" />
                    </div>

                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic
                            ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='address'>
                        {extraInfor && extraInfor.addressClinic
                            ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>

                    {isShowDetailInfor === false &&

                        <div className='short-infor'>
                            <FormattedMessage id="patient.extra-infor-doctor.price" />:
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }
                            <br />
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />:
                            </span>
                        </div>


                    }
                    {isShowDetailInfor === true &&

                        <>
                            <div className='title-price'>
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />:
                                    </span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note
                                        ? extraInfor.note : ''}
                                </div>

                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />:  &nbsp;
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi : ''}

                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>

                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-detail" />
                                </span>
                            </div>

                        </>
                    }
                </div>
            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
