import React from "react";

export interface Advertising {
    id: number
    image: string
    description:string
    link?:string
}

export type Advertisings=Array<Advertising>