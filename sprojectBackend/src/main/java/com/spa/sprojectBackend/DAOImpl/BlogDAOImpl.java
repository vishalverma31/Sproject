package com.spa.sprojectBackend.DAOImpl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.spa.sprojectBackend.DAO.BlogDAO;
import com.spa.sprojectBackend.model.Blog;

@Repository("blogDAO")
@EnableTransactionManagement
@Transactional
public class BlogDAOImpl implements BlogDAO {

	@Autowired
	SessionFactory sessionFactory;
	
	public void addBlog(Blog blog) {
		Session session=sessionFactory.getCurrentSession();
		blog.setBlogStatus("New");
		
		session.saveOrUpdate(blog);
	}

	public void updateBlog(Blog blog) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(blog);		
	}

	public void deleteBlog(Blog blog) {
		Session session=sessionFactory.getCurrentSession();
		session.delete(blog);
		
	}

	public List<Blog> listBlogs() {
		Session session=sessionFactory.getCurrentSession();
		List<Blog> blogs=session.createQuery("from Blog where blogStatus='Approved'").getResultList();
		return blogs;
	}
	
	public List<Blog> listNewBlogs() {
		Session session=sessionFactory.getCurrentSession();
		List<Blog> blogs=session.createQuery("from Blog where blogStatus='New'").getResultList();
		return blogs;
	}

	public Blog getBlogByBlogId(long blogId) {
		Session session=sessionFactory.getCurrentSession();
		Blog blog=(Blog)session.createQuery("from Blog where blogId="+blogId).getSingleResult();
		
		return blog;
	}

	public void deleteBlogByUserId(long userId) {
		Session session=sessionFactory.getCurrentSession();
		String hql = "delete from Blog where userId="+userId;
		session.createQuery(hql).executeUpdate();
		
	}

}
