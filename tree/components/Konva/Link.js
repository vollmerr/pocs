import React from 'react';
import { Arrow } from 'react-konva';

export const getLinkPoints = ({ from, to }) => {
    const unit = 30;
    const cardWidth = unit * 10;
    const cardHeight = unit * 15;
    const arrowOffset = unit / 2;

    let fromX = from.x + (cardWidth / 2);
    let fromY = from.y + (cardHeight / 2);
    let toX = to.x + (cardWidth / 2);
    let toY = to.y + (cardHeight / 2);

    const isLeft = from.x < to.x - arrowOffset;
    const isRight = from.x > to.x + cardWidth + arrowOffset;
    const isAbove = from.y + cardHeight < to.y - arrowOffset;
    const isBelow = from.y > to.y + cardHeight + arrowOffset;

    if (isLeft) {
        fromX = from.x + cardWidth - arrowOffset;
        toX = to.x - arrowOffset;
    }

    if (isRight) {
        fromX = from.x + arrowOffset;
        toX = to.x + cardWidth + arrowOffset;
    }

    if (isAbove) {
        fromX = from.x + (cardWidth / 2);
        fromY = from.y + cardHeight - arrowOffset;
        toX = to.x + (cardWidth / 2);
        toY = to.y - arrowOffset;
    }

    if (isBelow) {
        fromX = from.x + (cardWidth / 2);
        fromY = from.y + arrowOffset;
        toX = to.x + (cardWidth / 2);
        toY = to.y + cardHeight + arrowOffset;
    }

    if ((isAbove || isBelow) && isLeft) {
        toX = to.x + (cardWidth / 2) - arrowOffset;
    }

    if ((isAbove || isBelow) && isRight) {
        toX = to.x + (cardWidth / 2) + arrowOffset;
    }

    return [fromX, fromY, toX, toY];
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