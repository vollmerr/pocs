import React from 'react';

class Text extends React.Component {
    static defaultProps = {
        lineHeight: 1,
    }

    constructor(props) {
        super(props);
        this.state = {
            lines: [],
        };
    }

    componentDidMount() {
        this.getLines(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getLines(nextProps);
    }

    getLines = (props) => {
        const { text, x, y, width, height, fontSize, lineHeight } = props;

        if (!document || !document.createElement) {
            return [];
        }

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const words = text.split(/\s+/);
        const lines = [];
        let nextY = y;
        let line = '';
        
        context.font = `${fontSize}px sans-serif`;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const withWord = `${line}${word} `;
            const tooLong = context.measureText(withWord).width > width;
            const tooHigh = nextY - y >= height - (lineHeight * fontSize);
            
            if (tooLong && tooHigh) {
                line = `${line} ...`;
                
                if (context.measureText(line).width > width) {
                    line = line.substring(0, line.length - 5).split(' ');
                    line[line.length - 1] = '...';
                    line = line.join(' ');
                }

                break;
            }

            if (tooLong) {
                lines.push({ x, y: nextY, text: line });
                line = `${word} `;
                nextY += (lineHeight * fontSize);
            } else {
                line = withWord;
            }
        }

        lines.push({ x, y: nextY, text: line });
        
        this.setState({ lines });
    }

    render() {
        const { x, y, fill, fontSize } = this.props;
        const { lines } = this.state;
        
        return (
            <text 
                data-testid={'text'}
                x={x} 
                y={y}
                fill={fill}
                fontSize={fontSize}
            >
                {lines.map((line, index) => (
                    <tspan 
                        x={line.x} 
                        y={line.y}
                        key={`line-${index}`}
                        alignmentBaseline={'hanging'}
                        // textAnchor={'middle'}
                    >
                        {line.text}
                    </tspan>
                ))}
            </text>
        );
    }
}

export default Text;

// TODO: 
// - vertical center
// - horiztonal center