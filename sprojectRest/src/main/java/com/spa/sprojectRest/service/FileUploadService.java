package com.spa.sprojectRest.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

@Path("/file")
public class FileUploadService {
	
	
	
	@POST
	@Path("/upload/")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(@FormDataParam("file") InputStream uploadedInputStream,@FormDataParam("file") FormDataContentDisposition fileDetails,@FormDataParam("userID") long userId)
	{
		
		System.out.println("UserID:"+userId);
		//String uploadLocation = request.getSession().getServletContext().getRealPath("/resources/dp_"+userId+".jpg");
		String uploadLocation="E://DT_project//.metadata//.plugins//org.eclipse.wst.server.core//tmp1//wtpwebapps//sprojectFrontend/resources/dp_"+userId+".jpg";
		// "E://Projects//uploadedFiles/dp_"+userId+".jpg";
		try
		{
			BufferedOutputStream out=new BufferedOutputStream(new FileOutputStream(new File(uploadLocation)));
			  int read = 0;
              		byte[] bytes = new byte[1048576];//supports file size of 1 MB
              
              		while ((read = uploadedInputStream.read(bytes)) != -1) {
                  	out.write(bytes, 0, read);
        	    	}
              
              	    out.close();
			
		}catch(IOException ioe)
		{
			ioe.printStackTrace();
		}
		
		return Response.status(200).entity("file uploaded to "+uploadLocation).build();
	}
	

}
