(function(){
  'use strict';

  namespace( "rwt.views" );

  var ImageTemplate = rwt.templates.ImageTemplate;
  var TextTemplate = rwt.templates.TextTemplate;
  var StyleSelector = rwt.theme.StyleSelector;

  rwt.views.ButtonView = rwt.views.ControlView.extend( {

    name : "Button",

    events : {
      "click" : "select"
    },

    renderChanges : function( changes ) {
      if( changes.text || changes.image ) {
        this.renderContent();
      }
    },

    renderContent : function() {
      this.$el.empty();
      this.$el.append(
          ImageTemplate.render( 'Button-Image', this.model.get( "image" ) )
        + TextTemplate.render( 'Button-Text', this.model.get( "text" ) )
      );
    },

    select : function() {
      this.model.select();
    }

  } );

  rwt.views.ButtonView.themeParser = {

    "Button" : function( styleSheet, rules ) {
      var filter = [
        "background-color",
        "border",
        "padding",
        "font",
        "cursor",
        "background",
        "border-radius"
      ];
      var subWidgets = [
        new StyleSelector( ".Button-Text" ),
        new StyleSelector( ".Button-Image" ),
        new StyleSelector( ".Button-CheckIcon" ),
        new StyleSelector( ".Button-RadioIcon" )
      ];
      _.forEach( rules, function( rule ) {
        var selector = rule.getSelector();
        var newRule = styleSheet.getRule( selector );
        newRule.set( _.pick( rule.attributes, filter ) );
        if( rule.has( "spacing" ) ) {
          styleSheet.getRule( subWidgets ).set( {
            "margin-right" : rule.get( "spacing" )
          } );
        }
      } );
      styleSheet.getRule( ".Button" ).set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
    },

    "Button-Text" : function( styleSheet ) {
      styleSheet.getRule( ".Button-Text" ).set( {
        "display" : "inline-block",
        "vertical-align" : "middle"
      } );
    },

    "Button-Image" : function( styleSheet ) {
      styleSheet.getRule( ".Button-Image" ).set( {
        "display" : "inline-block",
        "vertical-align" : "middle"
      } );
    },

    "Button-CheckIcon" : function( styleSheet, rules ) {
    },

    "Button-RadioIcon" : function( styleSheet, rules ) {
    }

  };

}());