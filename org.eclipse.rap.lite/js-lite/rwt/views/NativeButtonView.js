(function(){
  'use strict';

  namespace( "rwt.views" );

  var ImageTemplate = rwt.templates.ImageTemplate;
  var ButtonTemplate = rwt.templates.ButtonTemplate;
  var StyleUtil = rwt.theme.StyleUtil;

  rwt.views.NativeButtonView = rwt.views.ControlView.extend( {

    name : "NativeButtonView",

    events : {
      "click button" : "select"
    },

    renderChanges : function( changes ) {
      if( changes.text || changes.image ) {
        this.renderContent( this.$el, this.model, changes );
      }
      if( changes.selection ) {
        this.renderStates( this.$el, this.model );
      }
    },

    renderStates : function( el, model ) {
      el.toggleClass( "selected", model.get( "selection" ) );
    },

    renderContent : function( el, model ) {
      el.empty();
      el.append(
          ImageTemplate.render( 'Button-Image', model.get( "image" ) )
        + ButtonTemplate.render( 'Button-Text', model.get( "text" ) )
      );
    },

    select : function() {
      this.model.select();
    }

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.widgets.Button",
    accept : function( model ) {
      return    ( model.style.PUSH || model.style.TOGGLE )
             && model.get( "customVariant" ) === "native";
    },
    create : function( model ) {
      return new rwt.views.NativeButtonView( { "model" : model } );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Button" : function( styleSheet, rules ) {
      var buttonFilter = [ "cursor", "font", "color", "padding" ];
      var subwidgets = [
        [ [ ".NativeButtonView" ], [ ".Button-Text" ] ],
        [ [ ".NativeButtonView" ], [ ".Button-Image" ] ]
      ];
      var selectorMod = {
        addClass : ".NativeButtonView",
        addChildItem : [ ".Button-Text" ]
      };
      styleSheet.addRules( rules, selectorMod, buttonFilter );
      styleSheet.getRule( ".NativeButtonView" ).set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
      StyleUtil.parseSpacing( styleSheet, rules, subwidgets );
      styleSheet.getRule( subwidgets[ 0 ] ).set( {
        height : "100%"
      } );
      styleSheet.getRule( subwidgets ).set( {
        "display" : "inline-block",
        "vertical-align" : "middle"
      } );
    }

  } );

}());