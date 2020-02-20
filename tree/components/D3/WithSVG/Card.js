import React from 'react';
import * as d3 from 'd3';

import Text from './Text';

const unit = 30;
const width = unit * 8;
const height = unit * 12;
const padding = unit / 2;
const titleHeight = unit * 3;
const descHeight = unit * 3;
const imgHeight = unit * 6;
const lineHeight = 1.5;

class Card extends React.Component {
    cardRef = React.createRef();

    componentDidMount() {
        this.registerDragEvents();
    }
    
    registerDragEvents = () => {
        const register = d3.drag()
            .subject(() => {
                const target = d3.select(this.cardRef.current);
                return { x: target.attr('x'), y: target.attr('y') };
            })
            .on('drag', this.onDrag);

        register(d3.select(this.cardRef.current));
    }

    onDrag = () => {
        const { onDragMove, card } = this.props;

        d3.select(this.cardRef.current)
            .attr('x', d3.event.x)
            .attr('y', d3.event.y);
        
        onDragMove(d3.event, card);
    }

    render() {
        const { card } = this.props;
        
        return (
            <svg 
                data-testid={'card'}
                ref={this.cardRef} 
                id={card.id} 
                x={card.x} 
                y={card.y}
                width={width} 
                height={height}
            >
                <rect
                    width={width} 
                    height={height}
                    fill={'black'} 
                    stroke={'white'} 
                    strokeWidth={15}
                />

                <Text 
                    text={card.title}
                    x={padding}
                    y={padding}
                    fontSize={30}
                    lineHeight={1.5}
                    width={width - 2 * padding}
                    height={400}
                    fill={'white'}
                />
            </svg>
        );
    }
}

export default Card;