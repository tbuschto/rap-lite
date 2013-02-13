(function(){
  'use strict';

  namespace( "rwt.views" );

  var ImageTemplate = rwt.templates.ImageTemplate;
  var ButtonTemplate = rwt.templates.ButtonTemplate;
  var CheckBoxTemplate = rwt.templates.CheckBoxTemplate;
  var RadioButtonTemplate = rwt.templates.RadioButtonTemplate;
  var StyleUtil = rwt.theme.StyleUtil;

  rwt.views.NativeButtonView = rwt.views.ControlView.extend( {

    name : "NativeButton native", //fix

    events : {
      "click button" : "select"
    },

    renderChanges : function( changes ) {
      if( changes.text || changes.image ) {
        this.renderContent( this.$el, this.model, changes );
      }
    },

    renderContent : function( el, model ) {
      el.empty();
      el.append(
          ImageTemplate.render( 'Button-Image', model.get( "image" ) )
        + ButtonTemplate.render( model.get( "text" ) )
      );
    },

    select : function() {
      this.model.select();
    },

    getNativeTemplate : function( style ) {
      return style.PUSH ? ButtonTemplate : style.RADIO ? RadioButtonTemplate : CheckBoxTemplate;
    }

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.widgets.Button",
    accept : function( model ) {
      return model.get( "customVariant" ) === "variant_native" && model.style.PUSH;
    },
    create : function( model ) {
      return new rwt.views.NativeButtonView( { "model" : model } );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Button" : function( styleSheet, rules ) {
      var buttonFilter = [ "font", "cursor", "color" ];
      var subwidgets = [
        [ [ ".NativeButton" ], [ "button" ] ],
        [ [ ".NativeButton" ], [ "Button-Image" ] ]
      ];
      // label cursor!
      for( var i = 0; i < rules.length; i++ ) {
        var selector = rules[ i ].selector.clone( {
          replaceElement : ".NativeButton",
          addChildItem : [ "button" ]
        } );
        styleSheet.getRule( selector ).set( _.pick( rules[ i ].attributes, buttonFilter ) );
      }
      styleSheet.getRule( ".NativeButton" ).set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
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