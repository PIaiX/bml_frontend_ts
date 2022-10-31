type ApiRoutesTypes = {
    [key: string]: string
}

const apiRoutes: ApiRoutesTypes = {
    //news
    ACTIONS_NEWS: 'news',

    //banner
    GET_BANNER: 'banner',

    //feedback
    SEND_FEEDBACK: 'feedback',

    //auth
    LOGIN: 'auth/login',
    REFRESH_TOKEN: 'auth/refreshToken',
    LOGOUT: 'auth/logout',
    FORGOT_PASSWORD: 'auth/forgotPassword',
    FORGOT_PASSWORD_EMAIL_VERIFY: 'auth/forgotPassword/emailVerify',
    FORGOT_PASSWORD_CODE_VERIFY: 'auth/forgotPassword/codeVerify',
    REGISTER: 'auth/register',
    REGISTER_EMAIL_VERIFY: 'auth/register/emailVerify',
    REGISTER_CODE_VERIFY: 'auth/register/codeVerify',
}

const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL

export {apiRoutes, BASE_URL}
