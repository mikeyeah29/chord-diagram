# SVG Chord Diagram

Draw an SVG guitar chord diagram in javascript.

## Installation

Include the file dist/chord-diagram.min.js in a script tag

```html
   <script src="dist/chord-diagram.min.js" />
```

## Usage

Create a new chord diagram and put the name of the chord and the fret positions of each string as an array in the constructor parameters

```js
   var am = new ChordDiagram('Am', [-1, 0, 2, 2, 1, 0]);   
``` 
Append the svg to an element in the DOM

```js
   var div = document.getElementById('chords');
   div.appendChild(am.getSvg())
```
 # Development
 
The source code is in the js folder, to work on the project these files can be edited directly then when ready to publish run the following command from the root directory

```terminal
   npm run build
```

This will run build.js which concatenates and minifies all the js files to dist/chord-diagram.min.js  