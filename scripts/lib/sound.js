

var buzz = require( "buzz" );
var supported = buzz.isSupported();

var config = { 
	formats: [ "ogg", "mp3" ], 
	preload: true, 
	autoload: true, 
	loop: true
};

function ClassBuzz( src ){
    this.sound = new buzz.sound( src, config );
}

ClassBuzz.prototype.play = function( s ){
	s = this.sound;
	s.setPercent( 0 );
	s.setVolume( 10 );
	s.play();
};

ClassBuzz.prototype.stop = function(){
	this.sound.fadeOut( 1e3, function(){
	    this.pause();
	} );
};


exports.create = function( src ){
	if( !supported )
	    return unSupported;
	else
    	return new ClassBuzz( src );
}

function unSupported(){
	// TODO: 
}

unSupported.play =
unSupported.stop = function(){
	// TODO: 
};