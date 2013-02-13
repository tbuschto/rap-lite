(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.LabelView = rwt.views.ControlView.extend( {

    name : "LabelView",

    renderChanges : function( changes ) {
      if( changes.text || changes.image || changes.alignment ) {
        this.renderContent();
      }
    },

    renderContent : function() {
      this.$el.text( this.model.get( "text" ) );
    }

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.model.Label",
    create : function( model ) {
      return new rwt.views.LabelView( { "model" : model } );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Label" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font", "cursor" ];
      styleSheet.addRules( rules, { "addClass" : ".LabelView" }, supported );
    }

  } );

}());