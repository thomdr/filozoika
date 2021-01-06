import React from 'react';

export default function RouteComponent({ name, children }) {
    document.title = `${name} | Filozoika Paneel`;
    return <>{children}</>;
}
