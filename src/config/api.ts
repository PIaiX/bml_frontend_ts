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

    //offers
    GET_ARCHIVED_USERS_OFFERS: 'offer/user/archive/archived',
    GET_NOT_ARCHIVED_USERS_OFFERS: 'offer/user/archive/notArchived',
    PATCH_ARCHIVE_OFFER: 'offer/user/archive',
    DELETE_ARCHIVE_OFFER: 'offer/user/archive',
    GET_ALL_AREAS: 'offer/area',
    GET_FAVORITES_USER_OFFERS: 'offer/user/favorites',
    POST_CREATE_FAVORITE_OFFER: 'offer/user/favorites',
    DELETE_FAVORITE_OFFER: 'offer/user/favorites',
    GET_OFFER_PAGINATE: 'offer/paginate',
    ACTIONS_OFFER: 'offer',
    DELETE_OFFER_IMAGE: 'offer/deleteImage',
    GET_ALL_SUBSECTIONS: 'offer/subsection',

    //reports
    GET_USER_REPORT_TYPE: 'report/type/user',
    GET_OFFER_REPORT_TYPE: 'report/type/offer',
    REPORT: 'report',

    //mainTitle
    GET_MAIN_TITLE: 'projectData',
}

const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL

export {apiRoutes, BASE_URL}
