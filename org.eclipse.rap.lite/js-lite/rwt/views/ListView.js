(function(){
  'use strict';

  namespace( "rwt.views" );

  var TextTemplate = rwt.templates.TextTemplate;

  rwt.views.ListView = rwt.views.ControlView.extend( {

    name : "ListView",

    renderChanges : function( changes ) {
      if( changes.items ) {
        this.renderContent( this.$el, this.model );
      }
    },

    renderContent : function( el, model ) {
      var items = model.get( "items" );
      var content = [];
      content.length = items.length;
      for( var i = 0; i < content.length; i++ ) {
        content[ i ] = TextTemplate.render( "List-Item", items[ i ] );
      }
      el.empty();
      el.append( content.join( "" ) );
    }

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.widgets.List",
    create : function( model ) {
      return new rwt.views.ListView( { "model" : model } );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "List" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "font", "cursor" ];
      styleSheet.addRules( rules, { "addClass" : ".ListView" }, supported );
    }

  } );

}());
