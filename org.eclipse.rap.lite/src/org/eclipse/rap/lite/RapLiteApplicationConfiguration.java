package org.eclipse.rap.lite;

import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.application.Application;
import org.eclipse.rap.rwt.application.ApplicationConfiguration;
import org.eclipse.rap.rwt.internal.application.ApplicationImpl;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;


@SuppressWarnings("restriction")
public class RapLiteApplicationConfiguration implements ApplicationConfiguration {

  @Override
  public void configure( Application application ) {
    registerEntryPoints( application );
    registerThemes( application );
    registerClient( application );
    registerServlets();
  }

  private void registerEntryPoints( Application application ) {
    application.addEntryPoint( "/application", RapLiteEntryPoint.class, null );
    application.addEntryPoint( "/native", NativeEntryPoint.class, null );
  }

  private void registerThemes( Application application ) {
    application.addStyleSheet( RWT.DEFAULT_THEME_ID, "theme/legacy.css" );
    application.addStyleSheet( RWT.DEFAULT_THEME_ID, "theme/hacks.css" );
    application.addStyleSheet( RWT.DEFAULT_THEME_ID, "theme/native.css" );
  }

  private void registerClient( Application application ) {
    ApplicationImpl impl = ( ApplicationImpl )application;
    impl.addClientProvider( new RapLiteClientProvider() );
  }

  private void registerServlets() {
    BundleContext bc = FrameworkUtil.getBundle( this.getClass() ).getBundleContext();
    ServiceReference<HttpService> reference = bc.getServiceReference( HttpService.class );
    HttpService httpService = bc.getService( reference );
    try {
      httpService.registerServlet( "/lite", new RapLiteServlet(), null, null );
      httpService.registerServlet( "/full", new RedirectServlet(), null, null );
    } catch( Throwable e ) {
      e.printStackTrace();
      // find a cleaner way to register
    }
  }

}
