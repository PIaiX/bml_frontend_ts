export type IRegister = {
    body: {
        token: string
        user: {
            id: number
            isShowEmail: true
            isShowPhone: true
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
    }
}
