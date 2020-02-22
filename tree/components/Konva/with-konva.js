import React, { Fragment } from 'react';
import { Stage, Layer, Arrow, Line } from 'react-konva';

import data from './data';
import Card from './Card';
import Link, { getLinkPoints } from './Link';
import Grid from './Grid';

// TODO
// stage preview (top right mini nav for quick clcik go to) https://konvajs.org/docs/sandbox/Stage_Preview.html
// zoom - https://konvajs.org/docs/sandbox/Responsive_Canvas.html??
// dnd styling - https://konvajs.org/docs/sandbox/Elastic_Stars.html / https://konvajs.org/docs/react/Events.html
    // prevent collisions - https://konvajs.org/docs/sandbox/Collision_Detection.html
// text editing / add input - https://konvajs.org/docs/sandbox/Editable_Text.html
        // tree view..... https://konvajs.org/docs/sandbox/Connected_Objects.html
// undo/redo https://konvajs.org/docs/react/Undo-Redo.html
// save - loads from server start position, auto generated when adding new
    // grid snap / restirct drop locations
// unit tests
// e2e tests (need server feeding data....)
// server...


// TODO: common location for sizes..
const gridUnit = 60;

class WithKonva extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 600,
            byId: data.byId,
            allIds: data.allIds,
            scale: data.scale || 1,
            displayGrid: false,
            snapToGrid: true,
        };

        this.stageRef = React.createRef();
        this.linkLayerRef = React.createRef();
        this.cardLayerRef = React.createRef();
    }

    componentDidMount() {
        this.updateViewport();
        window.addEventListener('resize', this.updateViewport);
    }

    onClickCard = (event) => {
        this.preventDefault(event);
        const { button } = event.evt;
        const buttons = ['left', 'middle', 'right'];
        const message = {
            button: buttons[button],
            card: event.target,
        };

        alert(JSON.stringify(message, null, 2));
    }

    onDragCard = (event) => {
        this.updatePoints(event);
        this.detectCollisions(event);
    }

    onDragCardEnd = (event) => {
        this.snapToGrid(event);
        this.updatePoints(event);
    }

    preventDefault = (event) => {
        event.evt.preventDefault();
    }

    toggleSnapToGrid = () => {
        this.setState((state) => ({ snapToGrid: !state.snapToGrid }));
    }

    snapToGrid = (event) => {
        const { snapToGrid } = this.state;

        if (!snapToGrid) {
            return;
        }

        const { target } = event;
        const snappedX = Math.round(target.x() / gridUnit) * gridUnit;
        const snappedY = Math.round(target.y() / gridUnit) * gridUnit;

        target.x(snappedX);
        target.y(snappedY);
    }

    detectCollisions = (event) => {
        const { target } = event;

        this.cardLayerRef.current.children.each((card) => {
            if (card === target) {
                return;
            }

            if (this.hasInterection(card.getClientRect(), target.getClientRect())) {
                card.findOne('.card-rect').stroke('red');
            } else {
                card.findOne('.card-rect').stroke('white');
            }
        });
    }

    hasInterection = (r1, r2) => {
        return !(
            r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y
        );
    }

    updateViewport = () => {       
        this.setState({ width: window.innerWidth, height: window.innerHeight - 100 });
    }

    updatePoints = (event) => {
        const { byId } = this.state;
        const { target } = event;
        const id = target.getAttr('id');
        const card = byId[id];
        const { children, parent } = card;

        if (children && children.length) {
            children.forEach((childId) => {
                this.udpateLinkPoints({ fromId: id, toId: childId });
            });
        }

        if (parent) {
            this.udpateLinkPoints({ fromId: parent, toId: id });
        }

        this.setState({
            byId: {
                ...byId,
                [id]: {
                    ...card,
                    x: target.x(),
                    y: target.y(),
                },
            },
        });
    }

    udpateLinkPoints = ({ fromId, toId }) => {
        const fromRef = this.cardLayerRef.current.findOne(`#${fromId}`);
        const toRef = this.cardLayerRef.current.findOne(`#${toId}`);
        const linkRef = this.linkLayerRef.current.findOne(`#link-${fromId}-${toId}`);

        const points = getLinkPoints({
            from: { x: fromRef.x(), y: fromRef.y() },
            to: { x: toRef.x(), y: toRef.y() },
        });

        linkRef.points(points);
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

    toggleGrid = () => {
        this.setState((state) => ({ displayGrid: !state.displayGrid }));
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
                onClick={this.onClickCard}
                onDragMove={this.onDragCard}
                onDragEnd={this.onDragCardEnd}
            />
        )
    };

    render() {
        const { width, height, allIds, scale, displayGrid, snapToGrid } = this.state;

        return (
            <>
                <div style={{ color: 'white', display: 'flex', width: '200px', justifyContent: 'space-between' }}>
                    <div>zoom</div>
                    <button onClick={() => this.updateScale(0.1)}>+</button>
                    <button onClick={() => this.updateScale(-0.1)}>-</button>
                    <button onClick={this.resetScale}>reset</button>
                </div>

                <div style={{ color: 'white', display: 'flex', width: '400px', justifyContent: 'space-between' }}> 
                    <div>snap to grid</div>
                    <button onClick={this.toggleGrid}>toggle grid</button>
                    <button onClick={this.toggleSnapToGrid}>toggle snap to grid</button>
                    <div>{snapToGrid ? 'snapping' : 'free mode'}</div>
                </div>

                <Stage scaleX={scale} scaleY={scale} width={width} height={height} onContextMenu={this.preventDefault} draggable>
                    {displayGrid && <Layer><Grid /></Layer>}

                    <Layer ref={this.linkLayerRef}>
                        {allIds.map(this.renderLinks)}
                    </Layer>

                    <Layer ref={this.cardLayerRef}>
                        {allIds.map(this.renderCard)}
                    </Layer>
                </Stage>
            </>
        );
    }
}

export default WithKonva;