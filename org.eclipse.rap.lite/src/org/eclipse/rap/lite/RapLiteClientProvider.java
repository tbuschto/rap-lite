package org.eclipse.rap.lite;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.rap.rwt.client.Client;
import org.eclipse.rap.rwt.internal.client.ClientProvider;


@SuppressWarnings("restriction")
public class RapLiteClientProvider implements ClientProvider {

  @Override
  public boolean accept( HttpServletRequest request ) {
    boolean accept = request.getParameter( "lite" ) != null;
    return accept;
  }

  @Override
  public Client getClient() {
    return new RapLiteClient();
  }
}
