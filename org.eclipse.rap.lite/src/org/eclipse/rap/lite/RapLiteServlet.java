package org.eclipse.rap.lite;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.rap.rwt.internal.service.UISessionImpl;
import org.eclipse.swt.widgets.Display;


public class RapLiteServlet extends HttpServlet {

  private final String PATH = "/lite/";

  private String[] FILES = new String[]{
    "jquery-1.9.0.min.js",
    "underscore-1.4.4.min.js",
    "backbone-0.9.10.min.js",
    "bootstrap.js",
    "rap.js",
    "rwt/util/Strings.js",
    "rwt/remote/Server.js",
    "rwt/remote/HandlerRegistry.js",
    "rwt/remote/ObjectRegistry.js",
    "rwt/remote/MessageProcessor.js",
    "rwt/remote/MessageWriter.js",
    "rwt/remote/RemoteObject.js",
    "rwt/remote/RemoteObjectFactory.js",
    "rwt/widgets/Display.js",
    "rwt/widgets/Shell.js",
    "finalize.js"
  };

  private String loaderScript = null;


  @Override
  protected void doGet( HttpServletRequest req, HttpServletResponse resp )
    throws ServletException, IOException
  {
    String path = req.getPathInfo();
    if( path == null ) {
      deliverHTML( req, resp );
    } else if( path.equals( "/full" ) ) {
      startFullApplication( req, resp );
    } else if( path.equals( "/rap-lite.js" ) ) {
      deliverJavaScriptLoader( req, resp );
    } else if( !path.endsWith( ".map" ) ) { // source mapping feature used jquery & chrome
      deliverResource( req, resp );
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

  private void deliverJavaScriptLoader( HttpServletRequest req, HttpServletResponse resp ) {
    try {
      resp.setContentType( "text/javascript" );
      resp.getWriter().write( getLoaderScript() );
      resp.getWriter().close();
    } catch( IOException e ) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }

  private String getLoaderScript() {
    if( loaderScript == null ) {
      StringBuffer buffer = new StringBuffer();
      buffer.append( "(function(){\n" );
      buffer.append( "var files = [\n" );
      for( String file : FILES ) {
        buffer.append( "  \"" + PATH + file + "\",\n" );
      }
      buffer.append( "];\n" );
      buffer.append( "for( var i = 0; i < files.length; i++ ) {\n" );
      buffer.append( "  document.write( \"<script type=\\\"text/javascript\\\" " );
      buffer.append( "src=\\\"\" + files[ i ] + \"\\\"></script>\" );\n" );
      buffer.append( "}\n" );
      buffer.append( "}());\n" );
      loaderScript = buffer.toString();
    }
    return loaderScript;
  }

  private void deliverResource( HttpServletRequest req, HttpServletResponse resp ) {
    resp.setContentType( "text/javascript" );
    String file = req.getPathInfo();
    ClassLoader loader = RapLiteServlet.class.getClassLoader();
    InputStream stream = loader.getResourceAsStream( "js-lite/" + file );
    if( stream == null ) {
      stream = Display.class.getClassLoader().getResourceAsStream( "js/" + file );
    }
    if( stream != null ) {
      PrintWriter writer = null;
      try {
        writer = resp.getWriter();
        copyContents( stream, writer );
        writer.close();
      } catch( IOException e ) {
        throw new RuntimeException( e );
      }
    } else {
      System.out.println( "Request failed:" + req.getRequestURL() );
    }
  }

  @SuppressWarnings("restriction")
  private static void deliverHTML(  HttpServletRequest req, HttpServletResponse resp ) {
    UISessionImpl uiSession = UISessionImpl.getInstanceFromSession( req.getSession() );
    if( uiSession != null && !( uiSession.getClient() instanceof RapLiteClient ) ) {
      req.getSession().invalidate();
    }
    String path = "html/index.html";
    ClassLoader loader = RapLiteServlet.class.getClassLoader();
    InputStream stream = loader.getResourceAsStream( path );
    PrintWriter writer = null;
    try {
      writer = resp.getWriter();
      copyContents( stream, writer );
      writer.close();
    } catch( IOException e ) {
      throw new RuntimeException( e );
    } finally {
      try {
        stream.close();
      } catch( IOException e ) {
        throw new RuntimeException( e );
      }
    }
  }


  private static void copyContents( InputStream inputStream, PrintWriter writer )
    throws IOException
  {
    try {
      Reader reader = new BufferedReader( new InputStreamReader( inputStream, "UTF-8" ) );
      char[] buffer = new char[ 8192 ];
      int count = reader.read( buffer );
      while( count != -1 ) {
        writer.write( buffer, 0, count );
        count = reader.read( buffer );
      }
    } catch( UnsupportedEncodingException unexpected ) {
      throw new RuntimeException( unexpected );
    }
  }

}
