package org.eclipse.rap.lite;

import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.application.AbstractEntryPoint;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ControlEvent;
import org.eclipse.swt.events.ControlListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;


public class RapLiteEntryPoint extends AbstractEntryPoint {

  @Override
  protected void createContents( Composite parent ) {
    Label label = new Label( parent, SWT.WRAP );
    label.setText( "Using " + RWT.getClient().getClass().getCanonicalName() );
    label.setLayoutData( new GridData( SWT.FILL, SWT.TOP, true, false ) );
    Button button = new Button( parent, SWT.PUSH );
    button.setText( "This is a button" );
    getShell().addControlListener( new ControlListener() {

      @Override
      public void controlResized( ControlEvent e ) {
        System.out.println( getShell().getSize() );
      }

      @Override
      public void controlMoved( ControlEvent e ) {
        // TODO Auto-generated method stub
      }
    } );
  }

}
