import React from 'react';

const Defs = () => {
    return (
        <defs>
            <marker
                id={'link-arrow'}
                viewBox={'0 0 10 10'} 
                refX={7} 
                refY={5} 
                markerUnits={'strokeWidth'} 
                markerWidth={4} 
                markerHeight={3} 
                orient={'auto'}
                fill={'white'}
            >
                <path d={'M 0 0 L 10 5 L 0 10 z'}/>
            </marker>
        </defs>
    );
};

export default Defs;