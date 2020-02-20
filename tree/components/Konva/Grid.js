import React from 'react';
import { Line } from 'react-konva';

const Grid = () => {
    const end = 100;
    const unit = 60;
    const range = [...Array(end).keys()];

    return (
        <>
            {range.map(x => (
                <Line
                    key={`x-${x}`}
                    stroke={'red'}
                    strokeWidth={1}
                    opacity={0.7}
                    dash={[4,4]}
                    points={[unit * x, 0, unit * x, unit * end]}
                />
            ))}

            {range.map(y => (
                <Line
                    key={`y-${y}`}
                    stroke={'red'}
                    strokeWidth={1}
                    opacity={0.7}
                    dash={[4,4]}
                    points={[0, unit * y, unit * end, unit * y]}
                />
            ))}
        </>
    );
};

export default Grid;