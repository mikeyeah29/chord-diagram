const concat = require('concat');
const minify = require('minify');
const fs = require('fs');

// concat js files

concat([
    'src/js/config.js',
    'src/js/ShapeFactory.js',
    'src/js/ChordDiagram.js'
], 'src/dist/chord-diagram.min.js');

// minify

const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false
    },
};

minify('./src/dist/chord-diagram.min.js', options)
    .then((min) => {

        fs.writeFileSync('src/dist/chord-diagram.min.js', min);

    })
    .catch(console.error);