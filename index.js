const readline = require('readline');
const fs = require('fs');

// Create a readline interface to read input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let counter = 1; // Counter to keep track of the SVG file numbers

// Function to generate an SVG file
function generateSVGFile(text, textColor, shape, shapeColor) {
  let shapeContent;

  // Determine the SVG shape based on user input
  if (shape === 'circle') {
    shapeContent = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" stroke="black" stroke-width="2" />`;
  } else if (shape === 'triangle') {
    shapeContent = `<polygon points="150,50 250,150 50,150" fill="${shapeColor}" stroke="black" stroke-width="2" />`;
  } else if (shape === 'square') {
    shapeContent = `<rect x="50" y="50" width="100" height="100" fill="${shapeColor}" stroke="black" stroke-width="2" />`;
  }

  // Generate the SVG content using the user inputs
  const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeContent}
    <text x="150" y="100" text-anchor="middle" fill="${textColor}" style="font-family: Arial, sans-serif; font-size: 24px;">${text}</text>
  </svg>`;

  // Create a filename for the SVG file and increment the counter
  const filename = `logo${counter}.svg`;
  counter++;

  // Write the SVG content to a file
  fs.writeFileSync(filename, svgContent);

  // Log the filename of the generated SVG file
  console.log(`Generated ${filename}`);
}

// Function to prompt the user for input and generate the SVG file
function promptUser() {
  rl.question('Enter text (up to three characters): ', (text) => {
    rl.question('Enter text color: ', (textColor) => {
      rl.question('Enter shape (circle, triangle, square): ', (shape) => {
        rl.question('Enter shape color: ', (shapeColor) => {
          // Call the generateSVGFile function with the user inputs
          generateSVGFile(text, textColor, shape, shapeColor);
          rl.close();
        });
      });
    });
  });
}

// Call the promptUser function to start the program
promptUser();

// Export the promptUser and generateSVGFile functions for testing or external use
module.exports = {
  promptUser,
  generateSVGFile,
};
