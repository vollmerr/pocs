import React, { createRef } from 'react';
import * as d3 from 'd3';

import data from './data';

// https://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048
class D3TreeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 2000,
            height: 1200,
            context: null,
        };

        this.canvasRef = createRef();
        this.imageRef = createRef();
    }


    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas = () => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id((d) => d.id))
            .force('charge', d3.forceManyBody())
        // .force('center', d3.forceCenter(width / 2, height / 2));

        const ticked = () => {
            context.clearRect(0, 0, width, height);
            data.nodes.forEach(this.drawCard);
        }

        const dragsubject = () => simulation.find(d3.event.x, d3.event.y);

        simulation.nodes(data.nodes)
            .on('tick', ticked);

        simulation.force('link')
            .links(data.links);

        d3.select(canvas)
            .call(d3.drag()
                .container(canvas)
                .subject(dragsubject)
                .on('start', this.dragStart)
                .on('drag', this.dragged)
                .on('end', this.dragStop)
            );

        this.setState({ width, height, context, simulation });
    }

    dragged = () => {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }

    dragStart = () => {
        const { simulation } = this.state;
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }

    dragStop = () => {
        const { simulation } = this.state;
        if (!d3.event.active) simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

    drawLink = (d) => {
        const { context } = this.state;
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
    }

    drawCard = (d) => {
        const { context } = this.state;
        const cardHeight = 600;
        const cardWidth = 300;
        const padding = 20;
        const doublePadding = padding * 2;
        const oneTwelfthHeight = cardHeight / 12;

        const titleHeight = oneTwelfthHeight * 2;
        const descriptionHeight = oneTwelfthHeight * 5;
        const imageHeight = oneTwelfthHeight * 5;

        context.moveTo(d.x + 3, d.y);

        // draw card container
        context.beginPath();
        context.rect(d.x, d.y, cardWidth, cardHeight);
        context.fillStyle = 'black';
        context.fill();
        context.strokeStyle = 'white';
        context.stroke();
        
        // font styling
        context.textBaseline = 'top';
        context.fillStyle = 'white';

        // draw title
        context.font = '30px sans-serif';
        this.fillTextWrapped({
            text: d.title,
            x: d.x + padding,
            y: d.y + padding,
            maxWidth: cardWidth - doublePadding,
            maxHeight: titleHeight - padding,
            lineHeight: 30,
        });

        // draw description
        context.font = '18px sans-serif';
        this.fillTextWrapped({
            text: d.description,
            x: d.x + padding,
            y: d.y + titleHeight + doublePadding,
            maxWidth: cardWidth - doublePadding,
            maxHeight: descriptionHeight - padding - doublePadding,
            lineHeight: 22,
        });

        // draw image
        const image = this.imageRef.current;
        context.drawImage(
            image,
            d.x + padding,
            d.y + titleHeight + descriptionHeight + padding,
            cardWidth - doublePadding,
            imageHeight - doublePadding,
        );
    }

    fillTextWrapped = ({ text, x, y, maxWidth, maxHeight, lineHeight }) => {
        const { context } = this.state;
        const words = text.split(' ');
        let nextY = y;
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const withWord = `${line}${word} `;
            const metrics = context.measureText(withWord);
            const tooLong = metrics.width > maxWidth;

            // truncate and stop if past max height
            if (tooLong && nextY - y >= maxHeight - lineHeight) {
                line = `${line} ...`;

                if (context.measureText(line).width > maxWidth) {
                    line = line.substring(0, line.length - 5).split(' ');
                    line[line.length - 1] = '...';
                    line = line.join(' ');
                }

                break;
            }

            if (tooLong) {
                context.fillText(line, x, nextY);
                line = `${word} `;
                nextY = nextY + lineHeight;
            } else {
                line = withWord;
            }
        }

        context.fillText(line, x, nextY);
    }

    render() {
        return (
            <>
                <img src={'/placeholder.png'} ref={this.imageRef} style={{ display: 'none' }} />
                <canvas width='2000' height='1200' ref={this.canvasRef} />
            </>
        );
    }
}

export default D3TreeCanvas;


/**

card dimensions

--------
padding
    title
    title
padding
padding
    description
    description
    description
    description
    description
padding
padding
    image
    image
    image
    image
    image
padding
--------

 */