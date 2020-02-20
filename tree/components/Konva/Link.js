import React from 'react';
import { Arrow } from 'react-konva';

export const getLinkPoints = ({ from, to }) => {
    const unit = 30;
    const cardWidth = unit * 8;
    const cardHeight = unit * 12;
    const arrowOffset = 15;

    let x1 = from.x + (cardWidth / 2);
    let y1 = from.y + (cardHeight / 2);
    let x2 = to.x + (cardWidth / 2);
    let y2 = to.y + (cardHeight / 2);

    const isLeft = from.x + cardWidth < to.x;
    const isRight = from.x > to.x + cardWidth;
    const isAbove = from.y + cardHeight < to.y;
    const isBelow = from.y > to.y + cardHeight;
    
    if (isLeft) {
        x2 = to.x - arrowOffset;
    }

    if (isRight) {
        x2 = to.x + cardWidth + arrowOffset;
    }

    if (isAbove) {
        y1 = from.y + cardHeight - arrowOffset;
        y2 = to.y - (arrowOffset / 2);
    }

    if (isBelow) {
        y1 = from.y + arrowOffset;
        y2 = to.y + cardHeight + (arrowOffset / 2);
    }

    return [x1, y1, x2, y2];
};

const Link = ({ from, to }) => {
    const id = `link-${from.id}-${to.id}`;
    const points = getLinkPoints({ from, to });

    return (
        <Arrow
            id={id}
            key={id}
            points={points}
            fill={'white'}
            stroke={'white'}
            strokeWidth={20}
        />
    );
};

export default Link;