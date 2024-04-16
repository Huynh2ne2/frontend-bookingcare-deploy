import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';


const Styles = {

    option: (provided, state) => ({
        ...provided,
        cursor: 'pointer'
    }),
};

class ManageSchedule extends Component {
    //khai báo chuẩn react
    constructor(props) {
        super(props);
        // const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                // console.log('Check object value languages: ', object.label);
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            // console.log('Huynh check range time: ', this.props.allScheduleTime)
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {

                //C1 //Không cần hứng data
                // data = data.map(item => {
                //     item.isSelected = false
                //     return item;
                // })

                //c2

                data = data.map(item => ({ ...item, isSelected: false }))//phải hứng data
            }
            // console.log('Huynh check range time: ', data)
            this.setState({
                rangeTime: data
            })
        }
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
        // console.log(`Huynh check  selected value:`, res)
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })

        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!");
            return;
        }
        if (!currentDate) {
            toast.error("Invalid Date!");
            return;
        }

        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatDate = moment(currentDate).unix();
        let formatDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            // console.log('Huynh check selected Time: ', selectedTime)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    // console.log('Check map schedule: ', schedule, index, selectedDoctor)
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })

            } else {
                toast.error("Invalid selected time!");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatDate: formatDate
        });
        // console.log('Huynh check result: ', result)
        // console.log('Huynh check res: saveBulkScheduleDoctor: ', res)
        if (res && res.errCode === 0) {
            toast.success("Save infor succeed!")
        } else {
            toast.error("Error saveBulkScheduleDoctor");
            console.log("Error saveBulkScheduleDoctor >>> error: ", res);
        }

    }

    handleChangeSelectWithLogin = () => {
        let selectOptions = [];
        if (this.props.userInfo && this.props.userInfo.id === this.props.userInfo.id) {
            selectOptions = this.state.listDoctors.map(doctor => ({
                value: doctor.value,
                label: doctor.label,
                isDisabled: doctor.value !== this.props.userInfo.id
            }));
        } else {
            selectOptions = [{ value: this.state.selectedDoctor.value, label: this.state.selectedDoctor.label }]
        }

        // console.log('Huyh check selectOptions: ', selectOptions)

        return selectOptions;
    }



    render() {
        console.log('Huynh check props: ', this.props)
        console.log('huynh check select value: ', this.state)
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        // console.log('Huynh check click time: ', rangeTime)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            {this.props.userInfo && this.props.userInfo.roleId === 'R2' &&
                                <Select
                                    styles={Styles}
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.handleChangeSelectWithLogin()}
                                />

                            }
                            {this.props.userInfo && this.props.userInfo.roleId === 'R1' &&
                                <Select
                                    styles={Styles}
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />

                            }




                        </div>
                        <div className='col-6'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                //lấy ngày hôm qua
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0
                                && rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
        allDoctors: state.admin1.allDoctors,
        allScheduleTime: state.admin1.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
