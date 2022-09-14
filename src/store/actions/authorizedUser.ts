import types from './types'

const setAuthorizedUser = (user) => {
    return (dispatch) => {
        dispatch({type: types.setAuthorizedUser, payload: user})
    }
}

const resetAuthorized = () => {
    return (dispatch) => {
        dispatch({type: types.resetAuthorizedUser})
    }
}

export default { setAuthorizedUser, resetAuthorized }