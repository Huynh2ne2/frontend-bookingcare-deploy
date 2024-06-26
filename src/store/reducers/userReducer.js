import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isRegister: false,
    userInfoRegister: null

}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: true,
                userInfoRegister: action.userInfoRegister
            }
        case actionTypes.USER_REGISTER_FAIL:
            return {
                ...state,
                isRegister: false,
                userInfoRegister: null
            }

        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;