import React from 'react'
import {Link} from 'react-router-dom'
import {convertLocaleDate} from '../helpers/convertLocaleDate'

interface Props {
    className: string
    date: string
    url: string
    title: string
}

const NewsMini: React.FC<Props> = (props) => {
    return (
        <article className={'news-mini ' + props.className}>
            <time className="fw_7 mb-1">{convertLocaleDate(props.date)}</time>
            <h6>
                <Link to={props.url}>{props.title}</Link>
            </h6>
        </article>
    )
}

export default NewsMini
