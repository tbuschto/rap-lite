(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ShellView = rwt.views.ControlView.extend( {

    name : "ShellView",

    applyParent : function() {
      var display = rwt.widgets.Display.getCurrent();
      var externalParent = display.getShellExtractor()( this.model );
      if( externalParent ) {
        this.$el.appendTo( externalParent );
        externalParent.addClass( rwt.theme.StyleUtil.DISPLAY_CLASS );
        this.isExternal = true;
        this.model.on( "destroy", function() {
          externalParent.remove();
        } );
      } else {
        this.$el.appendTo( display.el );
      }
    },

    renderBounds : function( model, bounds ) {
      this.$el.css( {
        "left" : this.isExternal ? 0 : bounds[ 0 ],
        "top" : this.isExternal ? 0 : bounds[ 1 ],
        "width" : bounds[ 2 ],
        "height" : bounds[ 3 ]
      } );
      if( this.isExternal ) { // find better approach (specific view)
        this.$el.parent().css( {
          "width" : bounds[ 2 ],
          "height" : bounds[ 3 ]
        } );
      }
    }

  } );

  rwt.views.ViewProviderRegistry.add( {
    model : "rwt.widgets.Shell",
    create : function( model ) {
      return new rwt.views.ShellView( { "model" : model } );
    }
  } );

  rwt.theme.ThemeStore.add( {

    "Shell" : function( styleSheet, rules ) {
      var supported = [ "background-color", "border", "padding", "font" ];
      styleSheet.addRules( rules, { "addClass" : ".ShellView" }, supported );
      styleSheet.getRule( ".ShellView" ).set( {
        "transition" : "width, height 200ms"
      } );
    }

  } );

}());