import React from 'react';

export const Balance = React.memo(({ value }) => {
    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your Balance:
            </div>
            <div className="font-semibold ml-4 text-slate-600 text-lg">
                ₹{value}
            </div>
        </div>
    );
});
