(function(){
  'use strict';

  namespace( "rwt.views" );

  var TextTemplate = rwt.templates.TextTemplate;

  rwt.views.ListView = rwt.views.ControlView.extend( {

    name : "ListView",

    events : {
      "mousedown .List-Item" : "select"
    },

    initialize : function() {
      this.initializeList();
    },

    initializeList : function() {
      this.initializeControl();
      this.scroller = rwt.scroller.ScrollerFactory.createScroller( this );
      this.$el.append( this.scroller.wrapper );
      this.$container = $( this.scroller.container );
      this.$container.addClass( "listviewcontainer" );
    },

    renderChanges : function( changes ) {
      if( changes.items ) {
        this.renderContent( this.$container, this.model );
      }
      if( changes.items || changes.selection ) {
        this.renderSelection( this.$container , this.model );
      }
      if( changes.topIndex ) {
        this.renderTopIndex( this.$container, this.model );
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

    renderTopIndex : function( el, model ) {
      var index = model.get( "topIndex" );
      var top = el.children().eq( index ).position().top;
      this.scroller.setTop( top );
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
    },

    "List-Item" : function( styleSheet, rules ) {
      var supported = [ "padding", "color", "font", "background-color", "background" ];
      styleSheet.addRules( rules, { "addClass" : ".ListView" }, supported );
      // TODO : currently selection elements are always connected with "<",
      // ".ListView .ListItem" wouldnt work.
      styleSheet.getRule( [ [ ".listviewcontainer" ], [ ".List-Item" ] ] ).set( {
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
