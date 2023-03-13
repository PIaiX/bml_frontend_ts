import React, {FC} from 'react'
import {useAppSelector} from '../../hooks/store'
import {Link} from "react-router-dom";

const Alert: FC = () => {
    const alertState = useAppSelector((state) => state.alert)

    return (
        <div className={
            'm ' + `${alertState?.isShow ? 'alert' : ''} ${alertState?.typeAlert ? alertState?.typeAlert : ''}`
        }>
            <div>
                {alertState?.message}
                {alertState?.withLink && <Link style={{color:"blue"}} to={'/enter'} >Войти</Link>}
            </div>
        </div>
    )
}

export default Alert
