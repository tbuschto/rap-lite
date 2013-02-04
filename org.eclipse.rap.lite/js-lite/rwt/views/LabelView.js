namespace( "rwt.views" );

rwt.views.LabelView = rwt.views.ControlView.extend( {

  renderChanges : function( changes ) {
    if( changes.text || changes.image || changes.alignment ) {
      this.renderContent();
    }
  },

  renderContent : function() {
    this.$el.text( this.model.get( "text" ) );
  }

} );