// // https://medium.com/@CarysMills/wrapping-svg-text-without-svg-2-ecbfb58f7ba4
// import React from 'react';

// let document;
// let context;

// if (document) {
//     canvas = doucment.createElement("canvas");
//     context = canvas.getContext("2d");
// }

// export const getTextWidth = (text, font = '500 12px sans-serif') => {
//     context.font = font;
//     return context.measureText(text).width;
// };

// export const fillTextWrapped = ({
//     text, 
//     x, 
//     y, 
//     fontSize,
//     lineHeight,
//     maxWidth, 
//     maxHeight, 
// }) => {
//     if (!context) {
//         return null;
//     }

//     const words = text.split(' ');
//     let nextY = y;
//     let line = '';

//     const lines = [];

//     for (let i = 0; i < words.length; i++) {
//         const word = words[i];
//         const withWord = `${line}${word} `;
//         const metrics = context.measureText(withWord);
//         const tooLong = metrics.width > maxWidth;

//         // truncate and stop if past max height
//         if (tooLong && nextY - y >= maxHeight - lineHeight) {
//             line = `${line} ...`;

//             if (context.measureText(line).width > maxWidth) {
//                 line = line.substring(0, line.length - 5).split(' ');
//                 line[line.length - 1] = '...';
//                 line = line.join(' ');
//             }

//             break;
//         }

//         if (tooLong) {
//             lines.push(
//                 <text x={x} y={nextY} fontSize={fontSize}>{line}</text>
//             );

//             line = `${word} `;
//             nextY = nextY + lineHeight;
//         } else {
//             line = withWord;
//         }
//     }

//     lines.push(
//         <text x={x} y={nextY} fontSize={fontSize}>{line}</text>
//     );

//     return lines;
// };