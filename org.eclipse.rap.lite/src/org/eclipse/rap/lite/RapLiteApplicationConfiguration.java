package org.eclipse.rap.lite;

import javax.servlet.ServletException;

import org.eclipse.rap.rwt.application.Application;
import org.eclipse.rap.rwt.application.ApplicationConfiguration;
import org.eclipse.rap.rwt.internal.application.ApplicationImpl;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;


@SuppressWarnings("restriction")
public class RapLiteApplicationConfiguration implements ApplicationConfiguration {

  @Override
  public void configure( Application application ) {
    application.addEntryPoint( "/application", RapLiteEntryPoint.class, null );
    ApplicationImpl impl = ( ApplicationImpl )application;
    impl.addClientProvider( new RapLiteClientProvider() );
    impl.getApplicationContext().getServletContext();
    BundleContext bc = FrameworkUtil.getBundle( this.getClass() ).getBundleContext();
    ServiceReference<HttpService> reference = bc.getServiceReference( HttpService.class );
    HttpService httpService = bc.getService( reference );
    try {
      httpService.registerServlet( "/lite", new RapLiteServlet(), null, null );
    } catch( NamespaceException e ) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    } catch( ServletException e ) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

}
