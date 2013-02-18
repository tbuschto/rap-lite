(function(){
  'use strict';

  namespace( "rwt.views" );

  var TextTemplate = rwt.templates.TextTemplate;

  rwt.views.ListView = rwt.views.ContainerView.extend( {

    name : "ListView",

    events : {
      "mousedown .List-Item" : "select"
    },

    renderChanges : function( changes ) {
      if( changes.items ) {
        this.renderContent( this.$container, this.model );
      }
      if( changes.items || changes.selection ) {
        this.renderSelection( this.$container, this.model );
      }
    },

    renderContent : function( el, model ) {
      var items = model.get( "items" );
      var content = [];
      var evenClasses = "List-Item ListView even";
      var oddClasses = "List-Item ListView";
      content.length = items.length;
      for( var i = 0; i < content.length; i++ ) {
        content[ i ] = TextTemplate.render( i % 2 === 0 ? evenClasses : oddClasses, items[ i ] );
      }
      el.empty();
      el.append( content.join( "" ) );
    },

    renderSelection : function( el, model ) {
      // TODO : optimization potential
      var selection = model.get( "selection" );
      var oldSelection = model.previous( "selection" );
      var children = el.children();
      _.forEach( oldSelection, function( index ) {
        children.eq( index ).removeClass( "selected" );
      } );
      _.forEach( selection, function( index ) {
        children.eq( index ).addClass( "selected" );
      } );
    },

    select : function( event ) {
      this.model.select( $( event.target ).index() );
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
      var rule = styleSheet.getRule( [ [ ".ListView" ], [ ".container"] ] );
      rule.set( {
        "position" : "absolute",
        "overflow" : "hidden",
        "left" : "0px",
        "top" : "0px",
        "min-width" : "100%"
      } );
      styleSheet.getRule( ".ListView" ).set( {
        "overflow" : "auto"
      } );
    },

    "List-Item" : function( styleSheet, rules ) {
      var supported = [ "padding", "color", "font", "background-color", "background" ];
      styleSheet.addRules( rules, { "addClass" : ".ListView" }, supported );
      styleSheet.getRule( ".List-Item" ).set( {
        "user-select" : "none",
        "margin" : "0px",
        "white-space" : "nowrap",
        "display" : "block",
        "vertical-align" : "middle",
        "cursor" : "default",
        "min-width" : "100%"
      } );
    }

  } );

}());
