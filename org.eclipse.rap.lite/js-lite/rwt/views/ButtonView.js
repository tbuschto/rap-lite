(function(){
  'use strict';

  namespace( "rwt.views" );

  var ImageTemplate = rwt.templates.ImageTemplate;
  var TextTemplate = rwt.templates.TextTemplate;
  var IconTemplate = rwt.templates.IconTemplate;
  var StyleUtil = rwt.theme.StyleUtil;

  rwt.views.ButtonView = rwt.views.ControlView.extend( {

    name : "Button",

    events : {
      "click" : "select"
    },

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
        + IconTemplate.render( this.getIcon( model.style ) )
        + TextTemplate.render( 'Button-Text', model.get( "text" ) )
      );
    },

    renderStates : function( el, model ) {
      el.toggleClass( "selected", model.get( "selection" ) );
    },

    select : function() {
      this.model.select();
    },

    getIcon : function( style ) {
      return style.CHECK ? "Button-CheckIcon" : style.RADIO ? "Button-RadioIcon" : null;
    }

  } );

  rwt.views.ButtonView.themeParser = {

    "Button" : function( styleSheet, rules ) {
      var filter = [
        "background-color", "border", "padding", "font", "cursor", "background", "border-radius"
      ];
      var subWidgets = [
        [ ".Button-Text" ], [ ".Button-Image" ], [ ".Button-CheckIcon" ], [ ".Button-RadioIcon" ]
      ];
      StyleUtil.addRulesToSheet( styleSheet, rules, filter );
      StyleUtil.parseSpacing( styleSheet, rules, subWidgets );
      styleSheet.getRule( ".Button" ).set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
      styleSheet.getRule( subWidgets ).set( {
        "display" : "inline-block",
        "vertical-align" : "middle"
      } );
    },

    "Button-CheckIcon" : function( styleSheet, rules ) {
      StyleUtil.parseIconRules( styleSheet, rules, ".Button" );
    },

    "Button-RadioIcon" : function( styleSheet, rules ) {
      StyleUtil.parseIconRules( styleSheet, rules, ".Button" );
    }

  };

}());