import React from 'react';

interface PercentageBarProps {
    value: number;
}

const PercentageBar: React.FC<PercentageBarProps> = ({ value }) => {
    return (
        <div className="percentage-bar">
            <div className="percentage-fill" style={{ width: `${value}%` }}>
                {value}%
            </div>
        </div>
    );
};

export default PercentageBar;
