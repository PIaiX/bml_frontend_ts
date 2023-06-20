export interface IBannerCard{
    image: string
    title: string
    scope: string
    investments: string
    id: number
    archiveExpire?:string
    isPricePerMonthAbsolute:boolean | null
    isVerified?:boolean,
    isArchived?:boolean,
    isBlocked?:boolean
    timeBeforeArchive:string
    blockDescription?:string | null
    subsection?:{
        area?:{
            name:string
        }
    }
}