import React, { createRef } from 'react';
import { fabric } from 'fabric';

import data from './data';

class WithFabric extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = new fabric.Canvas('canvas');
    }

    componentDidMount() {
        this.draw();
    }

    draw = () => {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });

        this.canvas.add(rect);
    }

    render() {
        return <canvas id={'canvas'} width="300" height="300" />
    }
}

export default WithFabric;