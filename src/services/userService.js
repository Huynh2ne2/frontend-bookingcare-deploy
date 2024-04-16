import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    //gọi server nodejs
    //email và password là một cái object
    return axios.post('/api/login', { email: userEmail, password: userPassword });
    //có biến object emil còn value là userEmail
}

//tạo function lấy tất cả thông tin người dùng

const getAllUsers = (inputId) => {
    // dùng route theo kiểu template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    // console.log('Check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', {id: userId})
    return axios.delete('/api/delete-user', {
        // headers: {
        //     Authorization: authorizationToken
        // },
        data: {
            id: userId
        }
    });
}

const editUserService = (inputdata) => {
    return axios.put('/api/edit-user', inputdata);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDocTorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDocTors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getSchedulebyDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

//phòng khám


const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}

const getDetailClinicyById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}


//Bác sĩ sẽ xem danh sách thông tin các bệnh nhân đã booking và ngày đặt lịch
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}



const sendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

export {
    handleLoginApi,
    getAllUsers, createNewUserService, deleteUserService, editUserService,
    getAllCodeService,
    getTopDocTorHomeService, getAllDocTors, saveDetailDoctor, getDetailInforDoctor, saveBulkScheduleDoctor,
    getSchedulebyDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getDetailSpecialtyById,
    createNewClinic, getAllClinic, getDetailClinicyById,
    getListPatientForDoctor,
    sendRemedy
}


