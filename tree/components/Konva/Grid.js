import React from 'react';
import { Line } from 'react-konva';
import useImage from 'use-image';

const Grid = () => {
    const end = 100;
    const unit = 30;
    const halfUnit = unit / 2;
    const range = [...Array(end).keys()];
    const halfRange = [...Array(end * 2).keys()];

    return (
        <>
            {range.map(x => (
                <Line
                    key={`x-${x}`}
                    stroke={'red'}
                    opacity={0.4}
                    points={[unit * x, 0, unit * x, unit * end]}
                />
            ))}

            {halfRange.map(x => (
                <Line
                    key={`x-${x}-half`}
                    stroke={'green'}
                    opacity={0.2}
                    points={[halfUnit * x, 0, halfUnit * x, halfUnit * end * 2]}
                />
            ))}

            {range.map(y => (
                <Line
                    key={`y-${y}`}
                    stroke={'red'}
                    opacity={0.4}
                    points={[0, unit * y, unit * end, unit * y]}
                />
            ))}

            {halfRange.map(y => (
                <Line
                    key={`y-${y}-half`}
                    stroke={'green'}
                    opacity={0.2}
                    points={[0, halfUnit * y, halfUnit * end * 2, halfUnit * y]}
                />
            ))}
        </>
    );
};



/*
    - directly under/above/side
    - 2 * unit min disatcne
    0, 
*/


/*
    - arrows are off....
*/

export default Grid;