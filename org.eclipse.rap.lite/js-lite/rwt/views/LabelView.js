(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.LabelView = rwt.views.ControlView.extend( {

    name : "Label",

    renderChanges : function( changes ) {
      if( changes.text || changes.image || changes.alignment ) {
        this.renderContent();
      }
    },

    renderContent : function() {
      this.$el.text( this.model.get( "text" ) );
    }

  } );

  rwt.views.LabelView.themeParser = {

    "Label" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font" ];
      rwt.theme.StyleUtil.addRulesToSheet( styleSheet, rules, supported );
    }

  };

}());