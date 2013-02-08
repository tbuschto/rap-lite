(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.TextTemplate = {

    textTemplate : _.template(
      "<div class='<%=data.classAttr%>' ><%=data.text%></div>",
      null,
      { "variable" : "data" }
    ),

    render : function( classAttr, text ) {
      if( !text ) {
        return "";
      }
      return this.textTemplate( {
        "classAttr" : classAttr,
        "text" : text
      } );
    }

  };

}());