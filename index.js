const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let counter = 1; // Counter to keep track of the SVG file numbers

function generateSVGFile(text, textColor, shape, shapeColor) {
    let shapeContent;

    if (shape === 'circle') {
        shapeContent = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" stroke="black" stroke-width="2" />`;
    } else if (shape === 'triangle') {
        shapeContent = `<polygon points="150,50 250,150 50,150" fill="${shapeColor}" stroke="black" stroke-width="2" />`;
    } else if (shape === 'square') {
        shapeContent = `<rect x="50" y="50" width="100" height="100" fill="${shapeColor}" stroke="black" stroke-width="2" />`;
    }

    const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeContent}
      <text x="150" y="100" text-anchor="middle" fill="${textColor}" style="font-family: Arial, sans-serif; font-size: 24px;">${text}</text>
    </svg>`;

    const filename = `logo.svg`;
    fs.writeFileSync(filename, svgContent);
    console.log(`Generated ${filename}`);
}

module.exports = generateSVGFile;

function promptUser() {
    rl.question('Enter text (up to three characters): ', (text) => {
        rl.question('Enter text color: ', (textColor) => {
            rl.question('Enter shape (circle, triangle, square): ', (shape) => {
                rl.question('Enter shape color: ', (shapeColor) => {
                    generateSVGFile(text, textColor, shape, shapeColor);
                    rl.close();
                });
            });
        });
    });
}

promptUser();
