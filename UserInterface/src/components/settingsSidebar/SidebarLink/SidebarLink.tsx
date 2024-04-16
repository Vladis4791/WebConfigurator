import React from 'react'
import './SidebarLink.scss';

interface SibebarLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    isActive: boolean
}

const SidebarLink = ({ isActive, ...props }: SibebarLinkProps) => {

    const getNavLinkClass = (isActive: boolean) => {
        const navLinkActiveClass = isActive ? 'active' : '';
        return `SidebarLink ${props.className} ${navLinkActiveClass}`;
    }

    return (
        <a {...props} className={getNavLinkClass(isActive)}>{props.children}</a>
    )
}

export default SidebarLink