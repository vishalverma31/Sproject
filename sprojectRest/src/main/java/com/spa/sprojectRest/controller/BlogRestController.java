package com.spa.sprojectRest.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spa.sprojectBackend.DAO.BlogDAO;
import com.spa.sprojectBackend.model.Blog;

@RestController
public class BlogRestController {

	@Autowired
	BlogDAO blogDAO;
	
	//-------------------Retrieve Approved Blogs--------------------------------------------------------
    
			@GetMapping(value="/blog/")
		    public ResponseEntity<List<Blog>> listAllBlogs() {
		        List<Blog> blogs = blogDAO.listBlogs();
		        if(blogs.isEmpty()){
		            return new ResponseEntity<List<Blog>>(HttpStatus.NO_CONTENT);
	                 //You may decide to return HttpStatus.NOT_FOUND
		        }
		        return new ResponseEntity<List<Blog>>(blogs, HttpStatus.OK);
		    }
			
	//-------------------Retrieve New Blogs--------------------------------------------------------
		    
			@GetMapping(value="/blog/new")
		    public ResponseEntity<List<Blog>> listNewBlogs() {
		        List<Blog> blogs = blogDAO.listNewBlogs();
		        if(blogs.isEmpty()){
		            return new ResponseEntity<List<Blog>>(HttpStatus.NO_CONTENT);
	                 //You may decide to return HttpStatus.NOT_FOUND
		        }
		        return new ResponseEntity<List<Blog>>(blogs, HttpStatus.OK);
		    }
	
	//-------------------Retrieve Single Blog--------------------------------------------------------
		   @GetMapping(value="/blog/{id}",produces=MediaType.APPLICATION_JSON_VALUE)
		    public ResponseEntity<Blog> getBlog(@PathVariable("id") long id) {
		        System.out.println("Fetching Blog with id " + id);
		        Blog blog = blogDAO.getBlogByBlogId(id);
			        if (blog == null) {
			            System.out.println("Blog with id " + id + " not found");
			            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
			        }
	    		        return new ResponseEntity<Blog>(blog, HttpStatus.OK);
			    }
		   
	//-------------------Create a Blog--------------------------------------------------------
		    
			@PostMapping(value = "/blog/")
		    public ResponseEntity<Void> createBlog(@RequestBody Blog blog) {
		         
		        blog.setDateTime(new Date()); 
		        blogDAO.addBlog(blog);
		  
		       
		        return new ResponseEntity<Void>(HttpStatus.CREATED);
		    }
			
			
		 //------------------- Update a Blog--------------------------------------------------------
		    
			@PutMapping(value = "/blog/{id}")
		    public ResponseEntity<Blog> updateBlog(@PathVariable("id") long id, @RequestBody Blog blog) {
		        Blog currentBlog = blogDAO.getBlogByBlogId(id);
		          
		        if (currentBlog==null) {
		            System.out.println("Blog with id " + id + " not found");
		            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
		        }
		  
		        currentBlog.setBlogTitle(blog.getBlogTitle());
		        currentBlog.setBlogContent(blog.getBlogContent());
		        	          
		        blogDAO.updateBlog(currentBlog);
		        return new ResponseEntity<Blog>(currentBlog, HttpStatus.OK);
		    }
		  
			
	//------------------- Delete a Blog --------------------------------------------------------
		    @DeleteMapping(value = "/blog/{id}")
		    public ResponseEntity<Blog> deleteBlog(@PathVariable("id") long id) {
		        System.out.println("Fetching & Deleting blog with id " + id);
		  
		        Blog blog = blogDAO.getBlogByBlogId(id);
		        if (blog == null) {
		            System.out.println("Unable to delete. Blog with id " + id + " not found");
		            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
		        }
		  
		        blogDAO.deleteBlog(blog);
		        return new ResponseEntity<Blog>(HttpStatus.NO_CONTENT);
		    } 
		    
	//-------------------Approve A Blog--------------------------------------------------------
		   @GetMapping(value="/approveblog/{id}",produces=MediaType.APPLICATION_JSON_VALUE)
		    public ResponseEntity<Blog> approveBlog(@PathVariable("id") long id) {
			        System.out.println("Fetching Blog with id " + id);
			        Blog blog = blogDAO.getBlogByBlogId(id);
				        if (blog == null) {
				            System.out.println("Blog with id " + id + " not found");
				            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
				        }
				        
				    blog.setBlogStatus("Approved");
				    blogDAO.updateBlog(blog);
				        
		   	        return new ResponseEntity<Blog>(blog, HttpStatus.OK);
		   }
		   
	//-------------------Reject A Blog--------------------------------------------------------
		   @GetMapping(value="/rejectblog/{id}",produces=MediaType.APPLICATION_JSON_VALUE)
		    public ResponseEntity<Blog> rejectBlog(@PathVariable("id") long id) {
			        System.out.println("Fetching Blog with id " + id);
			        Blog blog = blogDAO.getBlogByBlogId(id);
				        if (blog == null) {
				            System.out.println("Blog with id " + id + " not found");
				            return new ResponseEntity<Blog>(HttpStatus.NOT_FOUND);
				        }
				        
				    blog.setBlogStatus("Rejected");
				    blogDAO.updateBlog(blog);
				        
		   	        return new ResponseEntity<Blog>(blog, HttpStatus.OK);
		   }
		   
}
