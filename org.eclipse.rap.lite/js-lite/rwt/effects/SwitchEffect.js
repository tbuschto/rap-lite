namespace( "rwt.effects" );

(function(){
  'use strict';

  rwt.effects.SwitchEffect = function( view ) {
    var children = view.model.get( "children" );
    for( var i = 0; i < children.length; i++ ) {
      try {
        var child = rap.getObject( children[ i ] );
        if( child ) {
          this.hookChild( child.view );
        }
      } catch( ex ) {}
    }
    view.on( "append", this.hookChild, this );
    rap.on( "render", _.bind( this.onRender, this ) );
    this.clear();
  };

  rwt.effects.SwitchEffect.prototype = {

    clear : function() {
      this._appear = [];
      this._disappear = [];
    },

    hookChild : function( child ) {
      child.on( "effect:appear", this.onAppear, this );
      child.on( "effect:disappear", this.onDisappear, this );
    },

    onAppear : function( child ) {
      this._appear.push( child );
    },

    onDisappear : function( child ) {
      this._disappear.push( child );
    },

    onRender : function() {
      if( this._appear.length === 1 && this._disappear.length === 1 ) {
        console.log( "SWITCH!" );
      }
      this.clear();
    }

  };

  rwt.effects.EffectsRegistry.add( {
    supported : [ "ShellView", "CompositeView" ],
    accept : function( view ) {
      if( view.model.get( "customVariant" ) === "stack" && !view.effects.switchEffect ) {
        view.effects.switchEffect = new rwt.effects.SwitchEffect( view );
      }
    }
  } );

  rwt.theme.ThemeStore.add( {

    switchAni : function( styleSheet ) {
      styleSheet.getRule( "@keyframes switchAppear" ).set( {
        "from" : {
          "transform" : "translate( 0%, 0 ) scale( 0.9 )",
          "z-index" : 100
        },
        "40%" : {
          "transform" : "translate( 55%, 0 ) scale( 0.9 )",
          "z-index" : 100
        },
        "60%" : {
          "transform" : "translate( 55%, 0 ) scale( 1 )",
          "z-index" : 101
        },
        "to" : {
          "transform" : "translate( 0%, 0 ) scale( 1 )",
          "z-index" : 101
        }
      } );
    }

  } );

}());