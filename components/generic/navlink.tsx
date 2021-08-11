import React, { useContext } from 'react';
import { Link, LinkProps } from "@reach/router";
import { AppMode } from '@/context/app-mode';

const NavLink = (props: React.PropsWithoutRef<LinkProps<any>> & React.RefAttributes<HTMLAnchorElement>) => {
    const { basePath } = useContext(AppMode);
    
    const Props = {
        ...props,
        to: `${basePath}${props.to}`
    };
    return (
        <Link
            {...Props}
            getProps={({ isCurrent }) => {
                return {
                    className: isCurrent ? `${props.className || 'menu-item'} is-active` : `${props.className || 'menu-item'}`
                };
            }}
        />
    )
};

export default NavLink;