package com.spa.sprojectBackend.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="BLOG", schema="DBSPA")
public class Blog {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long blogId;
	private String blogTitle;
	private String blogContent;
	private Date dateTime;
	private String blogStatus;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="userId")
	private User user;
	
	public Blog() {
		
	}
	

	public long getBlogId() {
		return blogId;
	}
	public void setBlogId(long blogId) {
		this.blogId = blogId;
	}
	
	
	public String getBlogTitle() {
		return blogTitle;
	}

	public void setBlogTitle(String blogTitle) {
		this.blogTitle = blogTitle;
	}

	public String getBlogContent() {
		return blogContent;
	}

	public void setBlogContent(String blogContent) {
		this.blogContent = blogContent;
	}
	
	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	
	public String getBlogStatus() {
		return blogStatus;
	}

	public void setBlogStatus(String blogStatus) {
		this.blogStatus = blogStatus;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	

}
