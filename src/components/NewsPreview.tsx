import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {checkPhotoPath} from '../helpers/photoLoader'

type Props = {
    imgUrl: string
    title: string
    text: string
    url: string
    readingTimeFrom?: number
    readingTimeTo?: number
}

const NewsPreview: FC<Props> = (props) => {
    return (
        <article className="news-preview">
            <NavLink to={`${props.url}`}>
                <img src={checkPhotoPath(props.imgUrl)} onLoad={()=>window.scrollTo(0,0)} alt={props.title}/>
                <div className="px-2 py-3">
                    <p className="title">{props.title}</p>
                    <div className="text" dangerouslySetInnerHTML={{__html: props?.text ? props?.text : ''}}>
                    </div>
                    <NavLink to={`${props.url}`} className="alink more">
                        Подробнее
                    </NavLink>
                </div>
            </NavLink>
        </article>
    )
}

export default NewsPreview
