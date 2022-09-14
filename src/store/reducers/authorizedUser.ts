import types from '../actions/types'

const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setAuthorizedUser:
            return action.payload
        case types.resetAuthorizedUser:
            return null
        default:
            return state
    }
}

export default reducer