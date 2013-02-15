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
    var node = view.el;
    node.addEventListener( "webkitAnimationEnd", this.onAnimationEnd, false );
    node.addEventListener( "animationend", this.onAnimationEnd, false );
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
        this._appear[ 0 ].$el.addClass( "switchAppear" );
        this._disappear[ 0 ].$el.css( "display", "" );
        this._disappear[ 0 ].$el.addClass( "switchDisappear" );
      }
      this.clear();
    },

    onAnimationEnd : function( event ) {
      var target = $( event.target );
      if( target.hasClass( "switchDisappear" ) ) {
        target.css( "display", "none" );
      }
      target.removeClass( "switchAppear switchDisappear" );
    }

  };

  if( rwt.client.Client.isGecko() || rwt.client.Client.isWebkit() ) {
    rwt.effects.EffectsRegistry.add( {
      supported : [ "ShellView", "CompositeView" ],
      accept : function( view ) {
        if( view.model.get( "customVariant" ) === "stack" && !view.effects.switchEffect ) {
          view.effects.switchEffect = new rwt.effects.SwitchEffect( view );
        }
      }
    } );
  }

  rwt.theme.ThemeStore.add( {

    switchAni : function( styleSheet ) {
      styleSheet.getRule( "@keyframes switchAppearKeyframes" ).set( {
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
      styleSheet.getRule( ".switchAppear" ).set( {
        "animation" : "1s switchAppearKeyframes",
        "animation-fill-mode" : "forwards"
      } );
      styleSheet.getRule( "@keyframes switchDisappearKeyframes" ).set( {
        "from" : {
          "transform" : "translate( 0%, 0 ) scale( 1 )",
          "z-index" : 101
        },
        "40%" : {
          "transform" : "translate( -55%, 0 ) scale( 1 )",
          "z-index" : 101
        },
        "60%" : {
          "transform" : "translate( -55%, 0 ) scale( 0.9 )",
          "z-index" : 100
        },
        "to" : {
          "transform" : "translate( 0%, 0 ) scale( 0.9 )",
          "z-index" : 100
        }
      } );
      styleSheet.getRule( ".switchDisappear" ).set( {
        "animation" : "1s switchDisappearKeyframes",
        "animation-fill-mode" : "forwards"
      } );
    }

  } );

}());