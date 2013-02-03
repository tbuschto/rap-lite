package org.eclipse.rap.lite;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SvgGenerator {

  public static void deliverGradient( HttpServletRequest req, HttpServletResponse resp ) {
    resp.setContentType( "image/svg+xml" );
    try {
      ServletOutputStream stream = resp.getOutputStream();
      writeXml( stream );
      writeSvg( stream, req );
    } catch( IOException e ) {
      e.printStackTrace();
    }
  }

  private static void writeXml( ServletOutputStream stream ) throws IOException {
    stream.print( "<?xml version=\"1.0\" ?>" );
  }

  private static void writeSvg( ServletOutputStream stream, HttpServletRequest req ) throws IOException {
    stream.print( "<svg " );
    stream.print( "xmlns=\"http://www.w3.org/2000/svg\" " );
    stream.print( "preserveAspectRatio=\"none\" version=\"1.0\" ");
    stream.print( "width=\"100%\" height=\"100%\" " );
    stream.print( "xmlns:xlink=\"http://www.w3.org/1999/xlink\"> " );
    writeDefs( stream, req );
    writeRect( stream );
    stream.print( "</svg>" );
  }

  private static void writeDefs( ServletOutputStream stream, HttpServletRequest req ) throws IOException {
    stream.print( "<defs>" );
    stream.print( "<linearGradient id=\"linear-gradient\" " );
    if( "true".equals( req.getParameter( "horizontal" ) ) ) {
      stream.print( "x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\" " );
    } else {
      stream.print( "x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\" " );
    }
    stream.print( "spreadMethod=\"pad\">" );
    writeStops( stream, req );
    stream.print( "</linearGradient>" );
    stream.print( "</defs>" );
  }

  private static void writeStops( ServletOutputStream stream, HttpServletRequest req ) throws IOException {
    String[] colors = req.getParameter( "colors" ).split( "," );
    String[] stops = req.getParameter( "stops" ).split( "," );
    for( int i = 0; i < colors.length; i++ ) {
      stream.print( "<stop offset=\"" );
      stream.print( stops[ i ] );
      stream.print( "%\" stop-color=\"#" );
      stream.print( colors[ i ] );
      stream.print( "\" />" );
    }
  }

  private static void writeRect( ServletOutputStream stream ) throws IOException {
    stream.print( "<rect width=\"100%\" height=\"100%\" " );
    stream.print( "style=\"fill:url(#linear-gradient);\" /> " );
  }

}

//
//</svg>