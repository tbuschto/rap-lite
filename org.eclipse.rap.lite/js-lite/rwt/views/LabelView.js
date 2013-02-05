(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.LabelView = rwt.views.ControlView.extend( {

    name : "Label",

    renderChanges : function( changes ) {
      if( changes.text || changes.image || changes.alignment ) {
        this.renderContent();
      }
    },

    renderContent : function() {
      this.$el.text( this.model.get( "text" ) );
    }

  } );

  rwt.views.LabelView.themeParser = {

    "Label" : function( styleSheet, selector, rule ) {
      var supported = [ "background-color", "border", "padding", "font" ];
      var attributes = _.pick( rule.attributes, supported );
      styleSheet.getRule( selector ).set( attributes );
    }

  };

}());