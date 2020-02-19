import React from 'react';
import * as d3 from 'd3';

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
                ref={this.cardRef} 
                id={card.id} 
                x={card.x} 
                y={card.y}
                width={width} 
                height={height}
            >
                <rect
                    data-testid={'card'}
                    width={width} 
                    height={height}
                    fill={'black'} 
                    stroke={'white'} 
                    strokeWidth={10}
                />
                
                {/* <text x={15} y={15} fill={'white'}>Title...</text>
                
                <text x={15} y={55} width={300 - 30} fill={'white'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</text>
                
                    */}
            </svg>
        );
    }
}

export default Card;