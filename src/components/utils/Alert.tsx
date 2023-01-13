import React, {FC} from 'react'
import {useAppSelector} from '../../hooks/store'

const Alert: FC = () => {
    const alertState = useAppSelector((state) => state.alert)

    return (
        <div
            className={
                'm ' + `${alertState?.isShow ? 'alert' : ''} ${alertState?.typeAlert ? alertState?.typeAlert : ''}`
            }
        >
            <div>{alertState?.message}</div>
        </div>
    )
}

export default Alert
