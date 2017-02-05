package com.spa.sprojectBackend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="BLOGCOMMENT", schema="DBSPA")
public class BlogComment {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long commentId;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	
	private String blogComment;
	
	@ManyToOne
	@JoinColumn(name="blogId")
	private Blog blog;
	
	private Date timeComment;
	
	public String getBlogComment() {
		return blogComment;
	}

	public void setBlogComment(String blogComment) {
		this.blogComment = blogComment;
	}

	public long getCommentId() {
		return commentId;
	}

	public void setCommentId(long commentId) {
		this.commentId = commentId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
	}

	public Date getTimeComment() {
		return timeComment;
	}

	public void setTimeComment(Date timeComment) {
		this.timeComment = timeComment;
	}
	
	

}
