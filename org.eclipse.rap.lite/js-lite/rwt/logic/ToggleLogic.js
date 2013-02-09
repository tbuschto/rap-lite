(function(){
  'use strict';

  namespace( "rwt.logic" );

  rwt.logic.ToggleLogic = function( model ) {
    model.on( "logic:selection", _.partial( this.onSelection, model ) );
  };

  rwt.logic.ToggleLogic.prototype = {

    onSelection : function( model, value, options ) {
      model.set( "selection", !model.get( "selection" ) );
    }

  };

}());