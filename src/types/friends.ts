export type IFriendsItem = {
    id: number
    isShowEmail: boolean
    isShowPhone: boolean
    type: number
    firstName: string
    lastName: string
    patronymic: string
    email: string
    birthday: string
    city: string
    phone: string
    avatar: string
    hobby: string
    taxpayerIdentificationNumber: number
    mainStateRegistrationNumber: number
    legalAddress: string
    placeOfWork: string
    companyName: string
    experienceType: number
    roleId: number
    createdAt: string
    updatedAt: string
    blockedUntil: string
    fullName: string
    createdAtForUser: string
    blockedUntilForUser: string
    experienceTypeForUser: string
    birthdayForUser: string
    roleForUser: string
    typeForUser: string
}

export type IFriendsMeta = {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
}
