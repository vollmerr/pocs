import React from 'react';
import { Drag, raise } from '@vx/drag';

import data from './data';
// import Defs from './Defs';
import Card from './Card';
// import Link from './Link';

const unit = 30;
const width = unit;
const height = 60;

class VXTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 800,
            byId: data.byId,
            allIds: data.allIds,
            scale: data.scale || 1,
            context: null,
        };

        // this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.updateViewport();
        // this.setContext();
    }

    // setContext = () => {
    //     const context = this.canvasRef.current.getContext('2d');
    //     this.setState({ context });
    // }

    // onDragCard = (event, card) => {
    //     const { byId } = this.state;
    //     const { x, y } = event;

    //     this.setState({
    //         byId: {
    //             ...byId,
    //             [card.id]: { ...card, x, y },
    //         },
    //     });
    // }

    updateViewport = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    // renderLinks = (id) => {
    //     const { byId } = this.state;
    //     const card = byId[id];

    //     if (!card.children || !card.children.length) {
    //         return null;
    //     }

    //     return (
    //         card.children.map((childId) => (
    //             <Link key={`link-${card.id}-${childId}`} from={card} to={byId[childId]} />
    //         ))
    //     );
    // }

    renderCard = (id) => {
        const { byId } = this.state;
        const d = byId[id];

        return (
            <Drag
                key={`${'d.id'}`}
                width={width}
                height={height}
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
                  <rect
                      key={`rect-${'d.id'}`}
                      x={20}
                      y={20}
                      width={30}
                      height={60}
                      transform={`translate(${dx}, ${dy})`}
                      fill={
                          isDragging
                          ? 'blue'
                          : 'red'
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
        )
    };

    render() {
        const { width, height, allIds, context } = this.state;
        
        return (
            <svg height={1000} width={1000}>
                {/* <Defs />
                {allIds.map(this.renderLinks)} */}
                {allIds.map(this.renderCard)}
            </svg>
        );
    }
}

export default VXTree;