package org.eclipse.rap.lite;

import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.application.AbstractEntryPoint;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;


public class RapLiteEntryPoint extends AbstractEntryPoint {

  @Override
  protected void createContents( Composite parent ) {
    Label label = new Label( parent, SWT.NONE );
    label.setText( "Using " + RWT.getClient().getClass().getCanonicalName() );
    Button button = new Button( parent, SWT.PUSH );
    button.setText( "This is a button" );
  }

}
