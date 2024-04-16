import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './DetailClinic.scss';
import Header from '../../HomePage/HomeHeader';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtrainfor from '../Doctor/DoctorExtrainfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { Link } from 'react-router-dom';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicyById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;

                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                // console.log('Huynh check data: ', arrDoctorId)
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        console.log('Huynh check state: ', this.state)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>


                    <div className='description-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div>
                                    {dataDetailClinic.name}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                                </div>
                            </>
                        }

                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {

                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='doctor-infor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                            {/* <div>
                                                {listProvince && listProvince.length > 0
                                                    && listProvince.map((item, index) => {
                                                        return (

                                                            <option key={index} value={item.keyMap}>
                                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtrainfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>


                                    </div>
                                </div>

                            )
                        })
                    }
                    {dataDetailClinic && dataDetailClinic.length > 0 &&
                        dataDetailClinic.map((item, index) => {
                            console.log('Huynh check item, index: ', item, index)
                            return (
                                <div key={index}>
                                    {item.doctorSpecialty.provinceId}
                                </div>
                            )

                        })

                    }
                </div>
            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
