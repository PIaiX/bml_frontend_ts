import React, {FC, useState} from 'react'
import {useAppSelector} from '../../hooks/store'

type Props = {
    setVal?: (val: string) => void
    val?: string
}

const CitiesForm: FC<Props> = ({setVal, val = ''}) => {
    const cities: string[] = useAppSelector((state) => state?.cities.cities)
    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState(val)
    const cityClick = (e: any) => {
        setValue(e.target.textContent)
        if (setVal) {
            setVal(e.target.textContent)
        }
    }
    return (
        <div style={{position: 'relative'}} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
            <input
                value={value}
                onChange={(val) => {
                    setValue(val.target.value)
                    if (setVal) setVal(val.target.value)
                }}
                placeholder={'Введите город'}
            />
            {focus && (
                <div className={'citiesSearch'} style={{backgroundColor: 'white', marginTop: '2px', zIndex: '99'}}>
                    {cities
                        .slice()
                        .sort()
                        .filter((val) => val.indexOf(value) !== -1)
                        .map((value, index) => (
                            <div
                                key={index}
                                style={{borderBottom: '2px solid silver', height: ' 25px'}}
                                onMouseDown={(e) => {
                                    cityClick(e)
                                }}
                            >
                                {value}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default CitiesForm