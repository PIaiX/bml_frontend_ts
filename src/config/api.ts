type ApiRoutesTypes = {
    [key: string]: string
}

const apiRoutes: ApiRoutesTypes = {
    //news
    ACTIONS_NEWS: 'news',

    //banner
    GET_BANNER: 'banner',
}

const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL

export {apiRoutes, BASE_URL}
