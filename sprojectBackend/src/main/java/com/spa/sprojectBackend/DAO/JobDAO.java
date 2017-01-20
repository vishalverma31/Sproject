package com.spa.sprojectBackend.DAO;

import java.util.List;

import com.spa.sprojectBackend.model.Job;
import com.spa.sprojectBackend.model.JobApplication;

public interface JobDAO {
	public void addJob(Job job);
	public void updateJob(Job job);
	public Job getJobById(long jobId);
	public List<Job> listJobs();
    public void saveJobApplication(JobApplication jobApplication);
}
