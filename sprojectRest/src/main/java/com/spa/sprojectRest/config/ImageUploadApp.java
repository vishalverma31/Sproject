package com.spa.sprojectRest.config;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import com.spa.sprojectRest.service.FileUploadService;

@ApplicationPath("/rest")
public class ImageUploadApp extends Application{
	
	@Override
	public Set<Class<?>> getClasses() {
		
		Set<Class<?>> s=new HashSet<Class<?>>();
		s.add(FileUploadService.class);
		
		return s;
		
	}

}
