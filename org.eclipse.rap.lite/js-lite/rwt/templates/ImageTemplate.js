(function(){
  'use strict';

  namespace( "rwt.templates" );

  rwt.templates.ImageTemplate = {

    imageTemplate : _.template(
        "<div class='icon subwidget' style='background-image:url(<%=image[0]%>);"
      + "width:<%=image[1]%>px;height:<%=image[2]%>px'></div>",
      null,
      { "variable" : "image" }
    ),

    render : function( imageArr ) {
      if( !imageArr ) {
        return "";
      }
      return this.imageTemplate( imageArr );
    }

  };

}());