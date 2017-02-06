package com.spa.sprojectBackend.DAO;

import java.util.List;

import com.spa.sprojectBackend.model.Event;

public interface EventDAO {
	
	public void addEvent(Event event);
	public void deleteEvent(Event event);
	public Event getEvent(long eventId);
	public void joinEvent(long UserId,long eventId);
	public List<Event> getListOfEvents();
	public List<Event> getListofEventsJoined(long userId);

}
