(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.ButtonTemplate = {

    buttonTemplate : _.template(
      "<button class='<%=data.classAttr%>'><%=data.text%></button>",
      null,
      { "variable" : "data" }
    ),

    render : function( classAttr, text ) {
      if( !text ) {
        return "";
      }
      return this.buttonTemplate( {
        "text" : text,
        "classAttr" : classAttr ? classAttr : ""
      } );
    }

  };

}());