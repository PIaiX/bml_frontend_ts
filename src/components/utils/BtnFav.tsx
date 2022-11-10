import React, {useState} from 'react'
import {MdStarOutline, MdStar} from 'react-icons/md'

interface Props {
    className: string
    check?: boolean
}

const BtnFav: React.FC<Props> = (props) => {
    const [checked, setChecked] = useState(props.check)

    return (
        <button onClick={() => setChecked(!checked)} className={'btn-fav ' + props.className}>
            {checked ? <MdStar /> : <MdStarOutline />}
        </button>
    )
}

export default BtnFav
