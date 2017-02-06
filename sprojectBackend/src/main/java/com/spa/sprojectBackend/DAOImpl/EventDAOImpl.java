package com.spa.sprojectBackend.DAOImpl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.spa.sprojectBackend.DAO.EventDAO;
import com.spa.sprojectBackend.model.Event;
import com.spa.sprojectBackend.model.JoinEvent;
import com.spa.sprojectBackend.model.User;

@Repository("eventDAO")
@EnableTransactionManagement
@Transactional
public class EventDAOImpl implements EventDAO{
	
	@Autowired
	SessionFactory sessionFactory;

	public void addEvent(Event event) {
		Session session=sessionFactory.getCurrentSession();
		
		JoinEvent je= new JoinEvent();
		je.setEvent(event);
		je.setJoinedBy(event.getCreatedBy());
		session.saveOrUpdate(je);
		
		session.saveOrUpdate(event);
		
	}
	
	
	public void deleteEvent(Event event) {
		Session session=sessionFactory.getCurrentSession();
		session.delete(event);
		
	}

	public Event getEvent(long eventId) {
		Session session=sessionFactory.getCurrentSession();
		Event event=(Event)session.createQuery("from Event where eventId="+eventId).getSingleResult();
		return event;				
	}

	public List<Event> getListOfEvents() {
		Session session=sessionFactory.getCurrentSession();
		List<Event> listEvent=session.createQuery("from Event").getResultList();
		return listEvent;
	}

	public List<JoinEvent> getListofEventsJoined(long userId) {
		Session session=sessionFactory.getCurrentSession();
		List<JoinEvent> listjoinedEvent=session.createQuery("from JoinEvent where joinedBy="+userId).getResultList();
		return listjoinedEvent;
	}


	public void joinEvent(long UserId,long eventId) {
		Session session=sessionFactory.getCurrentSession();
		
		User u=(User)session.createQuery("from User where userId="+UserId).getSingleResult();
		
		Event event=(Event)session.createQuery("from Event where eventId="+eventId).getSingleResult();
		JoinEvent je= new JoinEvent();
		je.setEvent(event);
		je.setJoinedBy(u);
		
		session.saveOrUpdate(je);
	}


}
