package org.eclipse.rap.lite;

import org.eclipse.rap.rwt.RWT;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;


public class NativeEntryPoint extends RapLiteEntryPoint {

  @Override
  protected void createContents( Composite parent ) {
    createButtons( parent );
    Control[] children = parent.getChildren();
    for( Control child : children ) {
      child.setData( RWT.CUSTOM_VARIANT, "native" );
    }
  }
}
