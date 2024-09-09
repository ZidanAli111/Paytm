import React from 'react';

export const Heading = React.memo(({ label }) => {
    return <div className="font-bold text-4xl pt-6">{label}</div>;
});