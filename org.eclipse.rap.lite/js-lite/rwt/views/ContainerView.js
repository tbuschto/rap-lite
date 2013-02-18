(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ContainerView = rwt.views.ControlView.extend( {

    name : "ContainerView",

    initialize : function() {
      this.initializeContainer();
    },

    initializeContainer : function() {
      this.initializeControl();
      this.container = document.createElement( "div" );
      this.$container = $( this.container );
      this.$container.addClass( "container" );
      this.$el.append( this.container );
    },

    append : function( child ) {
      if( child instanceof Backbone.View ) {
        this.$container.append( child.$el );
      } else {
        this.$container.append( child );
      }
      this.trigger( "append", child );
    }

  } );

}());