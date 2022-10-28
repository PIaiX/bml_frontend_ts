import React, {FC} from 'react'
import {useMatches} from 'react-router-dom'

const Breadcrumbs: FC = () => {
    let matches = useMatches()
    let crumbs = matches
        .filter((match: any) => Boolean(match?.handle?.crumb))
        .map((match: any) => match?.handle?.crumb(match.data))

    return (
        <nav className="breadcrumbs">
            <ul className="list-unstyled">
                {crumbs.map((crumb, index) => (
                    <li key={index}>{crumb}</li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
