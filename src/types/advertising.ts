export interface IAdvertising {
    id: number
    image: string
    description:string
    link?:string
    adsTypeId:string
    placedForMonths:string

    subsectionId?:string
    userId:string
}

export type Advertisings=Array<IAdvertising>