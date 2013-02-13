(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.ButtonTemplate = {

    buttonTemplate : _.template(
      "<button><%=data.text%></button>",
      null,
      { "variable" : "data" }
    ),

    render : function( text ) {
      if( !text ) {
        return "";
      }
      return this.buttonTemplate( {
        "text" : text
      } );
    }

  };

}());