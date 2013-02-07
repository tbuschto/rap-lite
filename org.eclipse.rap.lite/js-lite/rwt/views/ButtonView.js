(function(){
  'use strict';

  namespace( "rwt.views" );

  var ImageTemplate = rwt.templates.ImageTemplate;
  var TextTemplate = rwt.templates.TextTemplate;

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
          ImageTemplate.render( this.model.get( "image" ) )
        + TextTemplate.render( this.model.get( "text" ) )
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
      _.forEach( rules, function( rule ) {
        var selector = rule.getSelector();
        var newRule = styleSheet.getRule( selector );
        newRule.set(_.pick( rule.attributes, filter ) );
        if( rule.has( "spacing" ) ) {
          var subSelector = selector.concat( [ ".subwidget" ] );
          styleSheet.getRule( subSelector ).set( {
            "margin-right" : rule.get( "spacing" )
          } );
        }
      } );
      styleSheet.getRule( ".Button" ).set( {
        "user-select" : "none",
        "white-space" : "nowrap"
      } );
      // TODO : make own themes Button-...
      styleSheet.getRule( [ ".Button", ".subwidget" ] ).set( {
        "display" : "inline-block",
        "vertical-align" : "middle"
      } );
    }

  };

}());