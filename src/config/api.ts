type ApiRoutesTypes = {
    [key: string]: string
}

const apiRoutes: ApiRoutesTypes = {
    //news
    ACTIONS_NEWS: 'news',

    //banner
    GET_BANNER: 'banner',

    //promocode
    GET_PROMOCODE:'promo',

    // advertising
    GET_ADVERTISING: 'ads/portions',
    SET_ADVERTISING: 'ads',
    GET_PRICES: 'ads/types',
    GET_MY_PUBLIC_ADS:'ads/my/public',
    GET_MY_MODERATION_ADS:'ads/my/moderation',
    GET_MY_ARCHIVED_ADS:'ads/my/archive',

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
    GET_MY_OFFERS: 'offer/my',
    GET_MODERATION_USERS_OFFERS: 'offer/user/moderation',
    GET_BANNED_USERS_OFFERS: 'offer/user/banned',
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
    GET_PREMIUM_SLOTS:'offer/premium/slots?page=1&limit=100&orderBy=asc',
    SET_PREMIUM_FRANCHISES: 'offer/premium/franchises',

    //reports
    GET_USER_REPORT_TYPE: 'report/type/user',
    GET_OFFER_REPORT_TYPE: 'report/type/offer',
    GET_ADS_REPORT_TYPE: 'report/type/ads',
    REPORT: 'report',

    //partners
    GET_UR_PARTNERS:'ourPartners',

    //mainTitle
    GET_MAIN_TITLE: 'projectData',

    //user-profile
    ACTIONS_FRIEND: 'user/friend',
    GET_INCOMING_FRIENDS: 'user/friend/incomings',
    GET_OUTGOING_FRIENDS: 'user/friend/outgoings',
    GET_CURRENT_FRIENDS: 'user/friend/friends',
    UPDATE_PASSWORD: 'user/updatePassword',
    ACTIONS_USER: 'user',
    GET_ID_CHAT:'conversation',
    GET_BALANCE:'user/balance',

    //instructions
    GET_PARTNERS: 'partner',
    GET_TUTORIALS: 'uploadTutorial',

    //subscription
    ACTIONS_SUBSCRIBE: 'subscribe',

    //pay history
    GET_PAY_HISTORY:'payments'

}

const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL
const BASE_URL_SOCKET: string | undefined = process.env.REACT_APP_BASE_URL_FOR_SOCKET

export { apiRoutes, BASE_URL, BASE_URL_SOCKET }
