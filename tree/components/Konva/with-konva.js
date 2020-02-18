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
        };

        this.stageRef = React.createRef();
        this.layerRef = React.createRef();
    }

    componentDidMount() {
        this.setState({ width: window.innerWidth, height: window.innerHeight - 100 });
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

    onDragCardEnd = () => {
        // snap to gid, (update links?)
    }

    preventDefault = (event) => {
        event.evt.preventDefault();
    }

    udpateLinkPoints = ({ fromId, toId }) => {
        const fromRef = this.layerRef.current.findOne(`#${fromId}`);
        const toRef = this.layerRef.current.findOne(`#${toId}`);
        const linkRef = this.layerRef.current.findOne(`#link-${fromId}-${toId}`);

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
        const { width, height, allIds, scale, displayGrid } = this.state;

        return (
            <>
                <button onClick={() => this.updateScale(0.1)}>+</button>
                <button onClick={() => this.updateScale(-0.1)}>-</button>
                <button onClick={this.resetScale}>reset</button>

                <button onClick={this.toggleGrid}>toggle grid</button>

                <Stage scaleX={scale} scaleY={scale} width={width} height={height} onContextMenu={this.preventDefault} draggable>
                    {/* <Layer>
                        {allIds.map(this.renderCard)}
                    </Layer> */}

                    <Layer ref={this.layerRef}>
                        {allIds.map(this.renderLinks)}
                        {allIds.map(this.renderCard)}
                    </Layer>

                    {displayGrid && <Layer><Grid /></Layer>}
                </Stage>
            </>
        );
    }
}

export default WithKonva;