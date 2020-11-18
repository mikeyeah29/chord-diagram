var shapeFactory = (function(){

    return {
        colors: {
            neck: '#d8ad88',
            string: '#000',
            fret: '#000',
            finger: '#000',
            symbols: '#000'
        },
        createGuitarNeck: function(width, height, topMargin){
            var guitarNeck = document.createElementNS(config.svgns, "rect");
            guitarNeck.setAttribute("width", width - config.padding);
            guitarNeck.setAttribute("height", height - topMargin);
            guitarNeck.setAttribute("fill", this.colors.neck);
            guitarNeck.setAttribute("y", topMargin);
            guitarNeck.setAttribute("x", config.padding / 2);
            return guitarNeck;
        },
        createString: function(x, y, height){
            var string = document.createElementNS(config.svgns, "rect");
            string.setAttribute('x', x);
            string.setAttribute('y', y);
            string.setAttribute('height', height);
            string.setAttribute('width', 3);
            string.setAttribute('fill', this.colors.string);
            return string;
        },
        createFret: function(width, position, stroke){
            var fret = document.createElementNS(config.svgns, "path");
            width = width + (config.padding / 2) + 0.5;
            fret.setAttributeNS(null, 'd', 'M ' + (config.padding / 2) + ' ' + position + ' L ' + width + ' ' + position);
            fret.setAttributeNS(null, 'stroke-width', stroke);
            fret.setAttributeNS(null, 'stroke', this.colors.fret);
            return fret;
        },
        createMarkSymbol: function(x, y, radius, open){
            var symbol = document.createElementNS(config.svgns, "circle");
            symbol.setAttributeNS(null, 'cx', x);
            symbol.setAttributeNS(null, 'cy', y);
            symbol.setAttributeNS(null, 'r', radius);
            if(open){
                symbol.setAttributeNS(null, 'fill', '#fff');
                symbol.setAttributeNS(null, 'stroke', '#000');
                symbol.setAttributeNS(null, 'stroke-width', 2);
            }
            return symbol;
        },
        // createOpenSymbol: function(x, y, radius){
        // 	var symbol = document.createElementNS(config.svgns, "circle");
        // 	symbol.setAttributeNS(null, 'cx', x);
        // 	symbol.setAttributeNS(null, 'cy', y);
        // 	symbol.setAttributeNS(null, 'r', radius);
        // 	return symbol;
        // },
        muteSymbol: function(x, y, radius){
            console.log('mute symbol');
            var p1 = document.createElementNS(config.svgns, "path");
            var p2 = document.createElementNS(config.svgns, "path");
            var mute = document.createElementNS(config.svgns, "svg");

            var position = 5;
            var width = 10;
            p1.setAttributeNS(null, 'd', 'M 10 ' + position + ' L ' + (width + 10) + ' ' + (position + width));
            p1.setAttributeNS(null, 'stroke-width', 2);
            p1.setAttributeNS(null, 'stroke', this.colors.fret);

            p2.setAttributeNS(null, 'd', 'M ' + (width + 10) + ' ' + position + ' L 10 ' + (position + width));
            p2.setAttributeNS(null, 'stroke-width', 2);
            p2.setAttributeNS(null, 'stroke', this.colors.fret);

            mute.setAttributeNS(null, 'x', x);
            mute.setAttributeNS(null, 'y', y);

            mute.appendChild(p1);
            mute.appendChild(p2);

            return mute;
        }
    };

})();