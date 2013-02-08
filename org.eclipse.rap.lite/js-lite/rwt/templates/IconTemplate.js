(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.IconTemplate = {

    iconTemplate : _.template(
        "<div class='<%=data.classAttr%>' ></div>",
      null,
      { "variable" : "data" }
    ),

    render : function( classAttr ) {
      if( !classAttr ) {
        return "";
      }
      return this.iconTemplate( {
        "classAttr" : classAttr
      } );
    }

  };

}());