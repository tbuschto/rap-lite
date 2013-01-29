(function(){

  var files = [
    "jquery-1.9.0.min.js",
    "rap.js",
    "bootstrap.js"
  ];

  for( var i = 0; i < files.length; i++ ) {
    document.write( "<script type=\"text/javascript\" src=\"" + path + files[ i ] + "\"></script>" );
  }

}());