import React from 'react';
import { scaleOrdinal } from '@vx/scale';
import { LinearGradient } from '@vx/gradient';
import { Drag, raise } from '@vx/drag';

const colors = [
  '#025aac',
  '#02cff9',
  '#02efff',
  '#03aeed',
  '#0384d7',
  '#edfdff',
  '#ab31ff',
  '#5924d7',
  '#d145ff',
  '#1a02b1',
  '#e582ff',
  '#ff00d4',
  '#270eff',
  '#827ce2',
];

function genCircles({ num, width, height }) {
  return Array(num)
    .fill(1)
    .map((d, i) => {
      const radius = 25 - Math.random() * 20;
      return {
        id: i,
        radius,
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius),
      };
    });
}

const genItems = ({ width, height }) =>
  genCircles({
    num: width < 360 ? 40 : 185,
    width,
    height,
  });

export default class DragI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: genItems({ ...props }),
    };
    this.colorScale = scaleOrdinal({
      range: colors,
      domain: this.state.items.map(d => d.id),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { width, height } = nextProps;
    if (width !== this.props.width) {
      this.setState(() => {
        return {
          items: genItems({ ...nextProps }),
        };
      });
    }
  }

  render() {
    const { width, height } = this.props;
    return (
      <div className="Drag" style={{ touchAction: 'none' }}>
        <svg width={width} height={height}>
          <LinearGradient id="stroke" from="#ff00a5" to="#ffc500" />

          <rect
            fill="#c4c3cb"
            width={width}
            height={height}
            rx={14}
          />

          {this.state.items.map((d, i) => (
            <Drag
              key={`${d.id}`}
              width={width}
              height={height}
              onDragStart={() => {
                // svg follows the painter model
                // so we need to move the data item
                // to end of the array for it to be drawn
                // "on top of" the other data items
                this.setState((state, props) => {
                  return {
                    items: raise(state.items, i),
                  };
                });
              }}
            >
              {({
                dragStart,
                dragEnd,
                dragMove,
                isDragging,
                dx,
                dy,
              }) => {
                return (
                //   <circle
                //     key={`dot-${d.id}`}
                //     cx={d.x}
                //     cy={d.y}
                //     r={isDragging ? d.radius + 4 : d.radius}
                //     transform={`translate(${dx}, ${dy})`}
                //     fill={
                //       isDragging
                //         ? 'url(#stroke)'
                //         : this.colorScale(d.id)
                //     }
                //     fillOpacity={0.9}
                //     stroke={isDragging ? 'white' : 'transparent'}
                //     strokeWidth={2}
                //     onMouseMove={dragMove}
                //     onMouseUp={dragEnd}
                //     onMouseDown={dragStart}
                //     onTouchStart={dragStart}
                //     onTouchMove={dragMove}
                //     onTouchEnd={dragEnd}
                //   />

                    <rect
                        key={`rect-${d.id}`}
                        x={d.x}
                        y={d.y}
                        width={30}
                        height={60}
                        transform={`translate(${dx}, ${dy})`}
                        fill={
                            isDragging
                            ? 'url(#stroke)'
                            : this.colorScale(d.id)
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
              }}
            </Drag>
          ))}
        </svg>
      </div>
    );
  }
}