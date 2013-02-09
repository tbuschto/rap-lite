(function(){
  'use strict';

  namespace( "rwt.logic" );

  rwt.logic.RadioLogic = function( model ) {
    model.on( "logic:selection", _.partial( this.onSelection, model ) );
    model.hasRadioLogic = true; // use a generic approach, like "addLogic"?
  };

  rwt.logic.RadioLogic.prototype = {

    onSelection : function( model, value, options ) {
      var siblings = model.getParent().getChildren();
      _.forEach( siblings, function( widget ) {
        if( widget.hasRadioLogic ) {
          widget.set( "selection", false );
        }
      } );
      model.set( "selection", true );
    }

  };

}());