package org.eclipse.rap.lite;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class RedirectServlet extends HttpServlet {

  @Override
  protected void doGet( HttpServletRequest req, HttpServletResponse resp )
    throws ServletException, IOException
  {
    String path = req.getPathInfo();
    if( path == null ) {
      startFullApplication( req, resp );
    }
  }

  private void startFullApplication( HttpServletRequest req, HttpServletResponse resp ) {
    req.getSession().invalidate(); // prevent application from continue using RapLiteClient
    try {
      resp.sendRedirect( "/application" );
    } catch( IOException e ) {
      e.printStackTrace();
    }
  }

}
