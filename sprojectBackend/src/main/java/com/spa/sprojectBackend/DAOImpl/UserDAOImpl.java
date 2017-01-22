package com.spa.sprojectBackend.DAOImpl;

import java.util.List;

import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.spa.sprojectBackend.DAO.UserDAO;
import com.spa.sprojectBackend.model.User;

@Repository("userDAO")
@EnableTransactionManagement
@Transactional
public class UserDAOImpl implements UserDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	public void addUser(User user) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(user);
		
	}

	public void updateUser(User user) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(user);
		
	}

	public void deleteUser(User user) {
		Session session=sessionFactory.getCurrentSession();
		session.delete(user);
		
	}

	public List<User> listUsers() {
		Session session=sessionFactory.getCurrentSession();
		List<User> users=session.createQuery("from User").getResultList();
		return users;
	}

	public User getUserByUserId(long userId) {
		Session session=sessionFactory.getCurrentSession();
		User user=(User)session.createQuery("from User where userId="+userId).getSingleResult();
		
		return user;
	}

	public User getUserByUsername(String username) {
		Session session=sessionFactory.getCurrentSession();
		User user=(User)session.createQuery("from User where username='"+username+"'").getSingleResult();
		
		return user;
	}

	public boolean isExistingUser(User user) {
		User u=null;
		try {
		u=getUserByUsername(user.getUsername());
		}catch(NoResultException nre){
			
		}
		if(u!=null)
		{
			return true;
		}
		else
			return false;
	}

	public boolean authenticate(String username, String password) {
		Session session=sessionFactory.getCurrentSession();
		User user;
		try{
		user=(User)session.createQuery("from User where username='"+username+"' and password='"+password+"'").getSingleResult();
		return true;
		}catch(NoResultException nre)
		{
			
		}
		
		return false;
	}

	public List<User> listUsersById(long userId) {
		Session session=sessionFactory.getCurrentSession();
		List<User> users=session.createQuery("from User where userId="+userId).getResultList();
		return users;
	}

}
