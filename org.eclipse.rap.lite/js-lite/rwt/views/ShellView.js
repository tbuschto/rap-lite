namespace( "rwt.views" );

rwt.views.Shell = rwt.views.Widget.extend( {

  name : "Shell",

  applyParent : function() {
    var parent = rwt.widgets.Display.getCurrent().el;
    this.$el.appendTo( parent );
  }

} );