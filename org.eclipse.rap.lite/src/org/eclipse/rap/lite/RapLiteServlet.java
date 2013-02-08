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

import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.internal.application.ApplicationContextImpl;
import org.eclipse.rap.rwt.internal.service.UISessionImpl;
import org.eclipse.rap.rwt.internal.theme.Theme;
import org.eclipse.rap.rwt.internal.theme.ThemeCssValuesMap;
import org.eclipse.rap.rwt.internal.theme.css.ConditionalValue;
import org.eclipse.swt.widgets.Display;


@SuppressWarnings("restriction")
public class RapLiteServlet extends HttpServlet {

  private final String PATH = "/lite/";

  private static String[] SCRIPTS = new String[]{
    "jquery-1.9.0.min.js",
    "underscore-1.4.4.min.js",
    "backbone-0.9.10.min.js",
    "bootstrap.js",
    "rap.js",
    "rwt/util/Strings.js",
    "rwt/util/Variant.js",
    "rwt/client/Client.js",
    "rwt/util/Encoding.js",
    "rwt/widgets/util/FontSizeCalculation.js",
    "rwt/remote/Server.js",
    "rwt/remote/HandlerRegistry.js",
    "rwt/remote/ObjectRegistry.js",
    "rwt/remote/MessageProcessor.js",
    "rwt/remote/MessageWriter.js",
    "rwt/remote/RemoteObject.js",
    "rwt/remote/RemoteObjectFactory.js",
    "rwt/remote/handler/TextSizeMeasurementHandler.js",
    "rwt/theme/ThemeStore.js",
    "rwt/theme/StyleSelectorItem.js",
    "rwt/theme/StyleSelector.js",
    "rwt/theme/StyleUtil.js",
    "rwt/theme/StyleSheet.js",
    "rwt/theme/StyleRule.js",
    "rwt/theme/StyleSheetGenerator.js",
    "rwt/templates/IconTemplate.js",
    "rwt/templates/ImageTemplate.js",
    "rwt/templates/TextTemplate.js",
    "rwt/views/ControlView.js",
    "rwt/views/ShellView.js",
    "rwt/views/LabelView.js",
    "rwt/views/ButtonView.js",
    "rwt/synchronizer/SelectionSynchronizer.js",
    "rwt/widgets/Display.js",
    "rwt/widgets/Control.js",
    "rwt/widgets/Shell.js",
    "rwt/widgets/Label.js",
    "rwt/widgets/Button.js",
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
    } else if( path.equals( "/gradient.svg" ) ) {
      SvgGenerator.deliverGradient( req, resp );
    } else if( path.startsWith( "/theme" ) ) {
      deliverTheme( req, resp );
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
      buffer.append( "var scripts = [\n" );
      for( String file : SCRIPTS ) {
        buffer.append( "  \"" + PATH + file + "\",\n" );
      }
      buffer.append( "];\n" );
      buffer.append( "document.write( \"<link type=\\\"text/css\\\" rel=\\\"stylesheet\\\"" );
      buffer.append( "href=\\\"" + PATH + "rap-lite.css" + "\\\"></link>\" );\n" );
      buffer.append( "for( var i = 0; i < scripts.length; i++ ) {\n" );
      buffer.append( "  document.write( \"<script type=\\\"text/javascript\\\" " );
      buffer.append( "src=\\\"\" + scripts[ i ] + \"\\\"></script>\" );\n" );
      buffer.append( "}\n" );
      buffer.append( "}());\n" );
      loaderScript = buffer.toString();
    }
    return loaderScript;
  }

  private void deliverResource( HttpServletRequest req, HttpServletResponse resp ) {
    String file = req.getPathInfo();
    if( file.endsWith( ".css" ) ) {
      resp.setContentType( "text/css" );
    } else {
      resp.setContentType( "text/javascript" );
    }
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

  private static void deliverTheme( HttpServletRequest req, HttpServletResponse resp ) {
    // TODO : Do this on the client!
    UISessionImpl uiSession = UISessionImpl.getInstanceFromSession( req.getSession() );
    final String themeId = RWT.DEFAULT_THEME_ID;
    if( uiSession != null ) {
      uiSession.exec( new Runnable() {
        @Override
        public void run() {
          ApplicationContextImpl context = ( ApplicationContextImpl )RWT.getApplicationContext();
          Theme theme = context.getThemeManager().getTheme( themeId );
          ThemeCssValuesMap sheet = theme.getValuesMap();
          ConditionalValue[] values = sheet.getValues( "Button", "background-color" );
          for( ConditionalValue value : values ) {
            System.out.println( join( value.constraints ) );
            System.out.println( value.value.toDefaultString() );
          }
        }
      } );
    } else {
      System.out.println( "No session - no theme" );
    }
  }

  private static String join( String[] strings ) {
    StringBuilder result = new StringBuilder();
    for( String string : strings ) {
      result.append( string );
    }
    return result.toString();
  }

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
