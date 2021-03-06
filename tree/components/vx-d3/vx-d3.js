import React from 'react';
import * as d3 from 'd3';

import data from './data';
// import Defs from './Defs';
import Card from './Card';
// import Link from './Link';

class VXD3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 800,
            byId: data.byId,
            allIds: data.allIds,
            scale: data.scale || 1,
        };
    }

    componentDidMount() {
        this.updateViewport();
    }

    onDragCard = (event, card) => {
        const { byId } = this.state;
        const { x, y } = event;

        this.setState({
            byId: {
                ...byId,
                [card.id]: { ...card, x, y },
            },
        });
    }

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
        const card = byId[id];

        return (
            <Card
                key={card.id}
                card={card}
                onDragMove={this.onDragCard}
            />
        )
    };

    render() {
        const { width, height, allIds, context } = this.state;
        
        return (
            <svg height={height} width={width} viewBox={'0 0 3000 3000'}>
                {/* <Defs /> */}
                {/* {allIds.map(this.renderLinks)} */}
                {allIds.map(this.renderCard)}
            </svg>
        );
    }
}

export default VXD3;
