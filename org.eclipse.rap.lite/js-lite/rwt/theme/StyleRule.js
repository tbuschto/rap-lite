(function(){
  'use strict';

  namespace( "rwt.theme" );

  var StyleUtil = rwt.theme.StyleUtil;

  rwt.theme.StyleRule = Backbone.Model.extend( {

    constructor : function( selector, attributes ) {
      Backbone.Model.apply( this, [ attributes ] );
      if( selector instanceof rwt.theme.StyleSelector ) {
        this.selector = selector;
      } else {
        this.selector = new rwt.theme.StyleSelector( selector );
      }
      this.selectorString = this.selector.toString();
    },

    toString : function() {
      return   this.selector.toString( true )
             + StyleUtil.ruleBodyToString( this.attributes, this.selector.isKeyframes(), "" );
    }

  } );

}());