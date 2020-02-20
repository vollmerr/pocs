import React from 'react';

class Card extends React.Component {
    render() {
        const { x, y, card, width, height, dragMove, dragStart, dragEnd, dx, dy, isDragging } = this.props;
            console.log('[Card] propssss', this.props)

        return (
            <rect
                x={card.x} 
                y={card.y}
                width={width} 
                height={height}
                transform={`translate(${dx}, ${dy})`}
                fill={
                    isDragging
                        ? 'red'
                        : 'blue'
                }
                fillOpacity={0.9}
                stroke={isDragging ? 'white' : 'transparent'}
                strokeWidth={2}
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
                onMouseDown={dragStart}
                onTouchStart={dragStart}
                onTouchMove={dragMove}
                onTouchEnd={dragEnd}
            />
        );
    }
}

export default Card;