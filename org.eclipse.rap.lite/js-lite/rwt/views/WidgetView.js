(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.Widget = Backbone.View.extend( {

    name : "Widget",

    className : function() {
      var result = [];
      var proto = this.constructor.prototype;
      while( proto ) {
        if( proto.name ) {
          result.push( proto.name );
        }
        proto = proto.constructor ? proto.constructor.__super__ : null;
      }
      return result.join( " " );
    },

    initialize : function() {
      this.applyParent();
      this.model.on( "change:bounds", this.renderBounds, this );
    },

    applyParent : function() {
      var parent = rap.getObject( this.model.get( "parent" ) );
      this.$el.appendTo( parent.view.$el );
    },

    renderBounds : function( model, bounds ) {
      this.$el.css( {
        "left" : bounds[ 0 ],
        "top" : bounds[ 1 ],
        "width" : bounds[ 2 ],
        "height" : bounds[ 3 ]
      } );
    }

  } );

}());