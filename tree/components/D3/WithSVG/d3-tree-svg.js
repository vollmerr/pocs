import React from 'react';

import data from './data';
import Defs from './Defs';
import Card from './Card';
import Link from './Link';

class D3TreeSvg extends React.Component {
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

    updateScale = (delta) => {
        const { scale } = this.state;

        if (scale + delta > 0.1) {
            this.setState({ scale: scale + delta });
        }
    }

    resetScale = () => {
        this.setState({ scale: data.scale || 1 });
    }

    updateViewport = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    renderLinks = (id) => {
        const { byId } = this.state;
        const card = byId[id];

        if (!card.children || !card.children.length) {
            return null;
        }

        return (
            card.children.map((childId) => (
                <Link key={`link-${card.id}-${childId}`} from={card} to={byId[childId]} />
            ))
        );
    }

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
        const { width, height, allIds, scale } = this.state;
        
        return (
            <>
                <div style={{ color: 'white', display: 'flex', width: '200px', justifyContent: 'space-between' }}>
                    <div>zoom</div>
                    <button onClick={() => this.updateScale(-100)}>+</button>
                    <button onClick={() => this.updateScale(100)}>-</button>
                    <button onClick={this.resetScale}>reset</button>
                </div>
{/* transform={`scale(${scale})`} */}
                <svg height={height} width={width} viewBox={`0 0 ${scale} ${scale}`}>
                    <Defs />
                    {allIds.map(this.renderLinks)}
                    {allIds.map(this.renderCard)}
                </svg>
            </>
        );
    }
}

export default D3TreeSvg;