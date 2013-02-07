(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.TextTemplate = {

    textTemplate : _.template(
        "<div class='text subwidget' ><%=text%></div>",
      null,
      { "variable" : "text" }
    ),

    render : function( text ) {
      if( !text ) {
        return "";
      }
      return this.textTemplate( text );
    }

  };

}());