
export interface Advertising {
    id: number,
    description: string
    createdAt: string
    offerImage: string
    paymentStatus: string
    placedAt: any
    placedAtForUser: any
    placedUntill: any
    placedUntillForUser: any
    subsectionImage: any
    updatedAt:string
    userId:string
}

export type Advertisings=Array<Advertising>