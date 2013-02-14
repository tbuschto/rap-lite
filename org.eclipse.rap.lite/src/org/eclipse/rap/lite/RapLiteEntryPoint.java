package org.eclipse.rap.lite;

import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.application.AbstractEntryPoint;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StackLayout;
import org.eclipse.swt.events.ControlEvent;
import org.eclipse.swt.events.ControlListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;


public class RapLiteEntryPoint extends AbstractEntryPoint {

  private int nr;
  private Composite layer1;
  private Composite layer2;
  private StackLayout stack;

  @Override
  protected void createContents( Composite parent ) {
    stack = new StackLayout();
    parent.setLayout( stack );
    layer1 = new Composite( parent, SWT.NONE );
    layer2 = new Composite( parent, SWT.NONE );
    stack.topControl = layer1;
    createButtons( layer1 );
    createOtherSide( layer2 );
    parent.layout();
    getShell().addControlListener( new ControlListener() {

      @Override
      public void controlResized( ControlEvent e ) {
        getShell().layout();
      }

      @Override
      public void controlMoved( ControlEvent e ) {
        // TODO Auto-generated method stub
      }
    } );
  }


  private void createOtherSide( Composite parent ) {
    parent.setLayout( new GridLayout() );
    final Label label = new Label( parent, SWT.WRAP );
    label.setText( "Hello there!" );
    label.setLayoutData( new GridData( SWT.FILL, SWT.TOP, true, false ) );
    createLayerSwitch( parent );
  }


  protected void createButtons( Composite parent ) {
    parent.setLayout( new GridLayout() );
    final Label label = new Label( parent, SWT.WRAP );
    label.setText( "Using " + RWT.getClient().getClass().getCanonicalName() );
    label.setLayoutData( new GridData( SWT.FILL, SWT.TOP, true, false ) );
    Button button = new Button( parent, SWT.PUSH );
    button.setLayoutData( new GridData( SWT.LEFT, SWT.TOP, true, false ) );
    button.setText( "This is a button" );
    button.setImage( Display.getCurrent().getSystemImage( SWT.ICON_INFORMATION ) );
    button.addListener( SWT.Selection, new Listener() {
      @Override
      public void handleEvent( Event event ) {
        nr++;
        label.setText( "Push " + nr );
      }
    } );
    final Button check = new Button( parent, SWT.CHECK );
    check.setLayoutData( new GridData( SWT.LEFT, SWT.TOP, true, false ) );
    check.setText( "This is a Check Box" );
    check.setImage( Display.getCurrent().getSystemImage( SWT.ICON_WARNING ) );
    check.setSelection( true );
    check.addListener( SWT.Selection, new Listener() {
      @Override
      public void handleEvent( Event event ) {
        label.setText( "Check Box " + ( check.getSelection() ? "" : "not " ) + "Checked" );
      }
    } );
    final Button toggle = new Button( parent, SWT.TOGGLE );
    toggle.setLayoutData( new GridData( SWT.LEFT, SWT.TOP, true, false ) );
    toggle.setText( "This is a toggle Button" );
    toggle.addListener( SWT.Selection, new Listener() {
      @Override
      public void handleEvent( Event event ) {
        label.setText( "Toggle Button " + ( toggle.getSelection() ? "Toggled" : "Untoggled (?)" ) );
      }
    } );
    final Button radioA = new Button( parent, SWT.RADIO );
    radioA.setLayoutData( new GridData( SWT.LEFT, SWT.TOP, true, false ) );
    radioA.setText( "Radio A" );
    radioA.addListener( SWT.Selection, new Listener() {
      @Override
      public void handleEvent( Event event ) {
        if( radioA.getSelection() ) {
          label.setText( "Option A" );
        }
      }
    } );
    final Button radioB = new Button( parent, SWT.RADIO );
    radioB.setLayoutData( new GridData( SWT.LEFT, SWT.TOP, true, false ) );
    radioB.setText( "Radio B" );
    radioB.addListener( SWT.Selection, new Listener() {
      @Override
      public void handleEvent( Event event ) {
        if( radioB.getSelection() ) {
          label.setText( "Option B" );
        }
      }
    } );
    createLayerSwitch( parent );
  }

  private void createLayerSwitch( final Composite layer ) {
    Button button = new Button( layer, SWT.PUSH );
    button.setText( "Visit the other side" );
    button.setLayoutData( new GridData( SWT.LEFT, SWT.TOP, true, false ) );
    button.addListener( SWT.Selection, new Listener() {
      @Override
      public void handleEvent( Event event ) {
        stack.topControl = layer == layer1 ? layer2 : layer1;
        layer.getParent().layout();
      }
    } );
  }

}
