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

//    events : {
//      "click" : "select"
//    },

    renderChanges : function( changes ) {
      if( changes.text || changes.image ) {
        this.renderContent( this.$el, this.model, changes );
      }
      if( changes.selection ) {
       this.renderStates( this.$el, this.model );
      }
    },

    renderContent : function( el, model ) {
      el.empty();
      el.append(
          ImageTemplate.render( 'Button-Image', model.get( "image" ) )
        + ButtonTemplate.render( model.get( "text" ) )
      );
    },

    renderStates : function( el, model ) {
//      el.toggleClass( "selected", model.get( "selection" ) );
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
      var buttonFilter = [
        "font", "cursor", "color"
      ];
      // label cursor!
      for( var i = 0; i < rules.length; i++ ) {
        var selector = rules[ i ].selector.clone( {
          replaceElement : ".NativeButton",
          addChildItem : [ "button" ]
        } );
        var newRule = styleSheet.getRule( selector );
        newRule.set( _.pick( rules[ i ].attributes, buttonFilter ) );
        if( rules[ i ].attributes.border ) {
          newRule.set( "border-width", rules[ i ].attributes.border.width );
        }
      }
      styleSheet.getRule( ".NativeButton" ).set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
      styleSheet.getRule( [ [ ".NativeButton" ], [ "button" ] ] ).set( {
        height : "100%"
      } );
      styleSheet.getRule( [ [ ".NativeButton" ], [ "*" ] ] ).set( {
        "display" : "inline-block",
        "vertical-align" : "middle"
      } );
      }

  } );

}());