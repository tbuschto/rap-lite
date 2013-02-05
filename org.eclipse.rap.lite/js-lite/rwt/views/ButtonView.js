(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ButtonView = rwt.views.ControlView.extend( {

    name : "Button",

    events : {
      "click" : "select"
    },

    renderChanges : function( changes ) {
      if( changes.text || changes.image || changes.alignment ) {
        this.renderContent();
      }
    },

    renderContent : function() {
      this.$el.text( this.model.get( "text" ) );
    },

    select : function() {
      this.model.select();
    }

  } );

  rwt.views.ButtonView.themeParser = {

    "Button" : function( styleSheet, selector, rule ) { // TODO : call only once for all rules
      var supported = [ "background-color", "border", "padding", "font" ];
      var attributes = _.pick( rule.attributes, supported );
      styleSheet.getRule( selector ).set( attributes );
    }

  };

}());