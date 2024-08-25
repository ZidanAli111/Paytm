import React from 'react';

export const InputBox = React.memo(({ label, placeholder, onChange, value, type = 'text' }) => {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-2 py-1 border rounded border-slate-200"
                value={value}
                type={type}
            />
        </div>
    );
});