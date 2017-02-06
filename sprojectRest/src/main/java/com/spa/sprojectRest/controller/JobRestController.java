package com.spa.sprojectRest.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spa.sprojectBackend.DAO.JobDAO;
import com.spa.sprojectBackend.DAO.UserDAO;
import com.spa.sprojectBackend.model.Job;
import com.spa.sprojectBackend.model.JobApplication;

@RestController
public class JobRestController {
	
	@Autowired
	JobDAO jobDAO;
	
	@Autowired
	UserDAO userDAO;
	
	//-------------------Retrieve All Jobs--------------------------------------------------------
    
	@GetMapping(value="/job/")
    public ResponseEntity<List<Job>> listAllJobs() {
        List<Job> jobs = jobDAO.listJobs();
        if(jobs.isEmpty()){
            return new ResponseEntity<List<Job>>(HttpStatus.NO_CONTENT);
             //You may decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Job>>(jobs, HttpStatus.OK);
    }
	
	//-------------------Retrieve Single Job by jobId--------------------------------------------------------
	   @GetMapping(value="/job/{jobId}",produces=MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Job> getJobById(@PathVariable("jobId") long jobId) {
	        System.out.println("Fetching Job with id " + jobId);
	        Job job = jobDAO.getJobById(jobId);
		        if (job == null) {
		            System.out.println("Job with id " + jobId + " not found");
		            return new ResponseEntity<Job>(HttpStatus.NOT_FOUND);
		        }
 		        return new ResponseEntity<Job>(job, HttpStatus.OK);
		    }
	 
    //-------------------Create a JOB--------------------------------------------------------
	    
		@PostMapping(value = "/job/")
	    public ResponseEntity<Void> createJob(@RequestBody Job job) {
	         job.setDateTime(new Date());
	         job.setStatus("open");
	        jobDAO.addJob(job);
	         
	        return new ResponseEntity<Void>(HttpStatus.CREATED);
	    }
	
	//---------------------------Applying for JOB-------------------------------------
		@PostMapping(value = "/applyForJob/{jobId}")
	    public ResponseEntity<Job> applyForJob(@PathVariable("jobId") long jobId,HttpSession session) 
		{
		  long loggedInUserId=(Long)session.getAttribute("loggedInUserId");
		  
		  JobApplication jobApplication=new JobApplication();
		  jobApplication.setJob(jobDAO.getJobById(jobId));
		  jobApplication.setStatus("New");
		  jobApplication.setDateApplied(new java.util.Date());
		  jobApplication.setUser(userDAO.getUserByUserId(loggedInUserId));
		  
		  jobDAO.saveJobApplication(jobApplication);
		  
		  return new ResponseEntity<Job>(HttpStatus.CREATED);
		}

}
