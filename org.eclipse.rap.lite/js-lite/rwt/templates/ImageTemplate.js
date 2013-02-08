(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.ImageTemplate = {

    imageTemplate : _.template(
        "<div class='<%=data.classAttr%>' style='"
      + "background-image:url(<%=data.image[0]%>);"
      + "width:<%=data.image[1]%>px;"
      + "height:<%=data.image[2]%>px'>"
      + "</div>",
      null,
      { "variable" : "data" }
    ),

    render : function( classAttr, imageArr ) {
      if( !imageArr ) {
        return "";
      }
      return this.imageTemplate( {
        "classAttr" : classAttr,
        "image" : imageArr
      } );
    }

  };

}());