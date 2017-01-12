package com.spa.sprojectBackend.DAO;

import java.util.List;

import com.spa.sprojectBackend.model.Blog;


public interface BlogDAO {
	public void addBlog(Blog blog);
	public void updateBlog(Blog blog);
	public void deleteBlog(Blog blog);
	public List<Blog> listBlogs();
	public Blog getBlogByBlogId(long blogId);
}
