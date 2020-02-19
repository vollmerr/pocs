import React, { createRef } from 'react';
import * as d3 from 'd3';

const data = [2, 4, 2, 6, 8];
const canvasHeight = 400;
const canvasWidth = 600;
const scale = 20;

const Test = () => <div>test...</div>;

class D3Basic extends React.Component {
    chartRef = createRef()

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas = () => {
        const svgCanvas = d3.select(this.chartRef.current)
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black')

        svgCanvas.selectAll('rect')
            .data(data).enter()
            .append('rect')
            .attr('width', 40)
            .attr('height', (datapoint) => datapoint * scale)
            .attr('fill', 'orange')
            .attr('x', (datapoint, iteration) => iteration * 45)
            .attr('y', (datapoint) => canvasHeight - datapoint * scale)
    }

    render() {
        return (
            <>
                <div>in d3 basic...</div>
                <div ref={this.chartRef} />
            </>
        );
    }
}

export default D3Basic;