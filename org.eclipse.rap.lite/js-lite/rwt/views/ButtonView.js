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

    "Button" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font", "cursor" ];
      rwt.theme.StyleUtil.addRulesToSheet( styleSheet, rules, supported );
      var sheet = styleSheet.getRule( ".Button" );
      sheet.set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
    }

  };

}());