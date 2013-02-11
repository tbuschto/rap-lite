(function(){
  'use strict';

  namespace( "rwt.views" );

  var ImageTemplate = rwt.templates.ImageTemplate;
  var ButtonTemplate = rwt.templates.ButtonTemplate;
  var CheckBoxTemplate = rwt.templates.CheckBoxTemplate;
  var RadioButtonTemplate = rwt.templates.RadioButtonTemplate;
  var StyleUtil = rwt.theme.StyleUtil;

  rwt.views.NativeButtonView = rwt.views.ControlView.extend( {

    name : "NativeButton",

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
        + ButtonTemplate.render( 'Button-Text', model.get( "text" ) )
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

//  rwt.theme.ThemeStore.add( {
//
//    "Button" : function( styleSheet, rules ) {
//      var buttonFilter = [
//        "border", "padding", "font", "cursor", "color"
//      ];
////      StyleUtil.addRulesToSheet( styleSheet, rules, filter );
////      StyleUtil.parseSpacing( styleSheet, rules, subWidgets );
//      for( var i = 0; i < rules.length; i++ ) {
//        var selector = rules[ i ].getSelector().clone( {
//          addClass : ".native",
//          addChild : "button"
//        } );
//        styleSheet.getRule( selector ).set( _.pick( rules[ i ].attributes, buttonFilter ) );
//      }
//      styleSheet.getRule( ".Button", [ ".native" ] ).set( {
//        "user-select" : "none",
//        "white-space" : "nowrap"
//      } );
//      var selector = new rwt.theme.StyleSelector( [
//        new rwt.theme.StyleSelectorItem( ".Button", [ ".native" ] ),
//        new rwt.theme.StyleSelectorItem( ".Button-Image" )
//      ] );
//      styleSheet.getRule( selector ).set( {
//      } );
//      styleSheet.getRule( ".Button", [ ".native" ] ).set( {
//        "user-select" : "none",
//        "white-space" : "nowrap"
//      } );
//    },
//
//    "Button-CheckIcon" : function( styleSheet, rules ) {
//      StyleUtil.parseIconRules( styleSheet, rules, ".Button" );
//    },
//
//    "Button-RadioIcon" : function( styleSheet, rules ) {
//      StyleUtil.parseIconRules( styleSheet, rules, ".Button" );
//    }
//
//  } );

}());