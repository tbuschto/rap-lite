(function(){
  'use strict';

  namespace( "rwt.views" );

  rwt.views.ControlView = Backbone.View.extend( {

    name : "Control",

    className : function() {
      var result = [];
      var proto = this.constructor.prototype;
      while( proto ) {
        if( proto.name ) { // TODO : needs to be own property
          result.push( proto.name );
        }
        proto = proto.constructor ? proto.constructor.__super__ : null;
      }
      return result.join( " " );
    },

    initialize : function() {
      this.initializeControl();
    },

    initializeControl : function() {
      this.applyParent();
      this.applyCssClasses();
      this.model.on( "change", this.render, this );
      this.model.on( "change:bounds", this.renderBounds, this );
    },

    render : function() {
      this.renderChanges( this.model.changedAttributes() );
    },

    renderChanges : function() {},

    applyParent : function() {
      var parent = rap.getObject( this.model.get( "parent" ) ).view;
      parent.append( this );
    },

    renderBounds : function( model, bounds ) {
      this.$el.css( {
        "left" : bounds[ 0 ],
        "top" : bounds[ 1 ],
        "width" : bounds[ 2 ],
        "height" : bounds[ 3 ]
      } );
    },

    applyCssClasses : function() {
      for( var style in this.model.style ) {
        this.$el.addClass( style );
      }
    },

    append : function( child ) {
      if( child instanceof Backbone.View ) {
        this.$el.append( child.$el );
      } else {
        this.$el.append( child );
      }
    }

  } );

  rwt.views.ControlView.themeParser = {
    "Control" : function( styleSheet ) {
      var rule = styleSheet.getRule( ".Control" );
      rule.set( {
        "position" : "absolute",
        "overflow" : "hidden"
      } );
    }
  };

}());