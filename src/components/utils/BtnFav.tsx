import React, {useState} from 'react';
import { MdStarOutline, MdStar } from "react-icons/md";

interface Props {
    className: string,
    checked: boolean
}

const BtnFav: React.FC<Props> = (props) => {
    const [checked, setChecked] = useState(props.checked);

    return (
        <button onClick={()=>setChecked((checked)?false:true)} className={"btn-fav "+props.className}>
            {
                (checked === true)?
                <MdStar />
                : <MdStarOutline />
            }
        </button>
    );
}

export default BtnFav