package com.spa.sprojectBackend.DAOImpl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.spa.sprojectBackend.DAO.FriendDAO;
import com.spa.sprojectBackend.DAO.UserDAO;
import com.spa.sprojectBackend.model.Friend;
import com.spa.sprojectBackend.model.User;

@Repository("friendDAO")
@EnableTransactionManagement
@Transactional
public class FriendDAOImpl implements FriendDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	UserDAO userDAO;
	
	public void addFriend(Friend friend) {
		Session session=sessionFactory.getCurrentSession();
		
		Friend friend2=new Friend();
		friend2.setUser(friend.getFriend());
		friend2.setFriend(friend.getUser());
		friend2.setIsOnline(false);
		friend2.setStatus("New");
		
		session.saveOrUpdate(friend);
		session.saveOrUpdate(friend2);
	}

	public void updateFriend(Friend friend) {
		Session session=sessionFactory.getCurrentSession();
		session.saveOrUpdate(friend);
		
	}

	public void deleteFriend(long id) {
		Session session=sessionFactory.getCurrentSession();
		String hql = "delete from Friend where id="+id;
		session.createQuery(hql).executeUpdate();
		
	}

	public List<Friend> listMyFriends(long id) {
		Session session=sessionFactory.getCurrentSession();
		List<Friend> friends=session.createQuery("from Friend where userId="+id+" and Status='Accepted'").getResultList();
		return friends;
	}

	public Friend getFriend(long userId, long friendId) {
		Session session=sessionFactory.getCurrentSession();
		
		Friend friend=(Friend)session
				.createQuery("from Friend where userId="+friendId+" and friendId="+userId)
				.getSingleResult(); 
		return friend;
	}

	public List<Friend> listMyFriendRequests(long userId) {
		Session session=sessionFactory.getCurrentSession();
		List<Friend> friends=session
				.createQuery("from Friend where userId="+userId+" and status='New'")
				.getResultList();
		return friends;
	}

	public void setOnline(long userId) {
		// TODO Auto-generated method stub
		
	}

	public void setOffline(long userId) {
		// TODO Auto-generated method stub
		
	}
	

}
