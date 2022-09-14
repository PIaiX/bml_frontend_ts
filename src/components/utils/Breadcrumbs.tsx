import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routeList } from '../../routes/AppRouter';
import { NavLink } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const breadcrumbs = useBreadcrumbs(routeList);
    return (
        <nav className="breadcrumbs">
            <ul className='list-unstyled'>
            {
                breadcrumbs.map(({match, breadcrumb}) => (
                    <li key={match.pathname}>
                        <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                    </li>
                ))
            }
            </ul>
        </nav>
    );
}

export default Breadcrumbs