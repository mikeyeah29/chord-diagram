var ChordDiagram = (function(config, shapeFactory){

	function ChordDiagram(name, notes, options){
		this.svg = null;
		this.name = name;
		this.notes = notes;
		this.width = 100;
		this.height = 140;
		this.topMargin = 25;
		this.circleSize = 8;
		this.strings = [
			{ 
				name: 'E',
				notes: ['e', 'f', 'f#', 'g', 'g#']
			},
			{ 
				name: 'A',
				notes: ['a', 'a#', 'b', 'c', 'c#']
			},
			{ 
				name: 'D',
				notes: ['d', 'd#', 'e', 'f', 'f#']
			},
			{ 
				name: 'G',
				notes: ['g', 'g#', 'a', 'a#', 'b']
			},
			{ 
				name: 'B',
				notes: ['b', 'c', 'c#', 'd', 'd#']
			},
			{ 
				name: 'E',
				notes: ['e', 'f', 'f#', 'g', 'g#']
			}
		];
		if(options){
			if(options.width){ this.width = options.width }
			if(options.height){ this.height = options.height }
		}
		// this.renderFromNotes();
		this.renderFromStrings();
	}
	ChordDiagram.prototype.getSvg = function() {
		return this.svg;
	};
	ChordDiagram.prototype.appendTo = function(element) {
		element.appendChild(this.svg);
	};
	ChordDiagram.prototype.renderFromStrings = function() {
		// create mark up
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute('viewBox', '0 0 ' + this.width + ' ' + this.height);
		var guitarNeck = shapeFactory.createGuitarNeck(this.width, this.height, this.topMargin);

		svg.appendChild(guitarNeck);

		this.svg = svg;

		// add frets
		var fretCount = 4;
		var fretHeight = (this.height - this.topMargin) / 4;
		var fretSpacing = (this.height - this.topMargin) / 4;
		var fretPos = this.topMargin;
		for(var i=0;i<fretCount + 1;i++){
			if(i === 0){
				svg.appendChild(shapeFactory.createFret(this.width - config.padding, fretPos, 9));
			}else{
				svg.appendChild(shapeFactory.createFret(this.width - config.padding, fretPos, 3));
			}
			fretPos = fretPos + fretSpacing;
		}

		var fingerPos = this.topMargin - (fretHeight / 2);

		// add strings
		var stringSpacing = ((this.width - config.padding) / 5) - 0.5;
		var stringPos = config.padding / 2;
		for(var i=0;i<this.strings.length;i++){
			// add string
			var string = this.strings[i];
			var svgString = shapeFactory.createString(stringPos, this.topMargin, this.height);
			svg.appendChild(svgString);

			// add finger instruction
			var fretNumber = this.notes[i]; // this.getFretNumberOfNote(string);

			if(fretNumber !== false){

				// add circle
				var cx = stringPos + 1.5;
				var cy = fingerPos + (fretHeight * fretNumber);

				if(fretNumber === 0){
					var circle = shapeFactory.createMarkSymbol(cx, cy, this.circleSize - 2, true);
				}else if(fretNumber === -1) {
					var str1x = -7 + (stringSpacing * i);
					var circle = shapeFactory.muteSymbol(str1x, 0, this.circleSize - 2, true);
					console.log(circle);
				}else{
					var circle = shapeFactory.createMarkSymbol(cx, cy, this.circleSize);
				}

				svg.appendChild(circle);

			}
			stringPos = stringPos + stringSpacing;
		}
	};
	ChordDiagram.prototype.renderFromNotes = function() {

		// create mark up
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute('viewBox', '0 0 ' + this.width + ' ' + this.height);
		var guitarNeck = shapeFactory.createGuitarNeck(this.width, this.height, this.topMargin);

		svg.appendChild(guitarNeck);

		this.svg = svg;

		// add frets
		var fretCount = 4;
		var fretHeight = (this.height - this.topMargin) / 4;
		var fretSpacing = (this.height - this.topMargin) / 4;
		var fretPos = this.topMargin;
		for(var i=0;i<fretCount + 1;i++){
			if(i === 0){
				svg.appendChild(shapeFactory.createFret(this.width - config.padding, fretPos, 9));
			}else{
				svg.appendChild(shapeFactory.createFret(this.width - config.padding, fretPos, 3));
			}
			fretPos = fretPos + fretSpacing;
		}

		var fingerPos = this.topMargin - (fretHeight / 2);

		// add strings
		var stringSpacing = ((this.width - config.padding) / 5) - 0.5;
		var stringPos = config.padding / 2;
		for(var i=0;i<this.strings.length;i++){
			// add string
			var string = this.strings[i];
			var svgString = shapeFactory.createString(stringPos, this.topMargin, this.height);
			svg.appendChild(svgString);
			// add finger instruction
			var fretNumber = this.getFretNumberOfNote(string);

			if(fretNumber !== false){

				// add circle
				var cx = stringPos + 1.5;
				var cy = fingerPos + (fretHeight * fretNumber);

				if(fretNumber === 0){
					var circle = shapeFactory.createMarkSymbol(cx, cy, this.circleSize - 2, true);
				}else{
					var circle = shapeFactory.createMarkSymbol(cx, cy, this.circleSize);
				}

				svg.appendChild(circle);

			}
			stringPos = stringPos + stringSpacing;
		}

	};
	ChordDiagram.prototype.drawStrings = function() {
		// body...
	};
	ChordDiagram.prototype.drawFrets = function() {
		// body...
	};
	ChordDiagram.prototype.getFretNumberOfNote = function(string) {
		// loop notes in chord
		for(var i=0;i<this.notes.length;i++){
			var note = this.notes[i];
			// loop notes on string
			for(var j=0;j<string.notes.length;j++){
				if(note === string.notes[j]){
					return j;
				}
			}
		}
		return false;
	};

	return ChordDiagram;

})(config, shapeFactory);