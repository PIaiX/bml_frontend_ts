import React, {FC, useState} from 'react'
import FunctionForPrice from '../../services/FunctionForPrice'
import {useForm} from 'react-hook-form'
import {IOfferForm} from '../../types/offers'

type PropsType = {
    placeholder?: string
    setOut: (val: string) => void
    maxValue?: number
    className?: string
}

const InputForPrice: FC<PropsType> = ({placeholder = '0', setOut, maxValue, className = ''}) => {
    const [price1, setPrice1] = useState<string>()
    const onChangePrice1 = (val: string) => {
        const num = parseInt(val.replaceAll(' ', '')).toString()
        if (num === 'NaN') {
            setPrice1('')
            setOut('')
        } else if ((maxValue && parseInt(num) <= maxValue) || !maxValue) {
            setPrice1(num)
            setOut(num)
        }
    }

    return (
        <input
            style={{paddingLeft: '10px'}}
            placeholder={FunctionForPrice(placeholder)}
            type="text"
            value={FunctionForPrice(price1)}
            onChange={(val) => onChangePrice1(val.target.value)}
            className={className}
        />
    )
}

export default InputForPrice
