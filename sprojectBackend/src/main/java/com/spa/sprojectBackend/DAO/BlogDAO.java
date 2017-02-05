package com.spa.sprojectBackend.DAO;

import java.util.List;

import com.spa.sprojectBackend.model.Blog;
import com.spa.sprojectBackend.model.BlogComment;


public interface BlogDAO {
	public void addBlog(Blog blog);
	public void updateBlog(Blog blog);
	public void deleteBlog(Blog blog);
	public List<Blog> listBlogs();
	public List<Blog> listNewBlogs();
	public Blog getBlogByBlogId(long blogId);
	public void deleteBlogByUserId(long userId);
	public List<BlogComment> commentListByBlogId(long BlogId);
	public void addBlogComment(BlogComment comment);
	
}
