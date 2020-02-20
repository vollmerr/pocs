import React from 'react';
import { Group, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';

const Card = ({ card, onClick, onDragMove, onDragEnd }) => {
    const { title, description, x, y, imageSrc } = card;
    const unit = 30;
    const width = unit * 8;
    const height = unit * 12;
    const padding = unit / 2;
    const titleHeight = unit * 3;
    const descHeight = unit * 3;
    const imgHeight = unit * 6;
    const lineHeight = 1.5;

    const [image] = useImage(imageSrc);

    return (
        <Group
            id={card.id}
            draggable
            onClick={onClick}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            x={x}
            y={y}
            name={'card'}
        >
            <Rect
                width={width}
                height={height}
                fill={'black'}
                stroke={'white'}
                strokeWidth={padding / 2}
                name={'card-rect'}
            />

            <Text
                lineHeight={lineHeight}
                height={titleHeight - (2 * padding)}
                width={width - (2 * padding)}
                text={title}
                fontSize={descHeight / lineHeight / 3}
                fontStyle={'bold'}
                fill={'white'}
                x={padding}
                y={padding}
                align={'center'}
                verticalAlign={'middle'}
            />

            <Text
                lineHeight={lineHeight}
                height={descHeight - (2 * padding)}
                width={width - (2 * padding)}
                text={description}
                fontSize={descHeight / lineHeight / 5}
                fill={'white'}
                x={padding}
                y={titleHeight + padding}
                verticalAlign={'middle'}
            />

            <Image
                height={imgHeight - (2 * padding)}
                width={width - (2 * padding)}
                image={image}
                x={padding}
                y={titleHeight + descHeight + padding}
            />
        </Group>
    );
};

export default Card;