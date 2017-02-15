package com.spa.sprojectBackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="JoinEvent", schema="DBSPA")
public class JoinEvent {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long joineventId;
	
	@ManyToOne
	@JoinColumn(name="eventId")
	private Event event;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;

	public long getJoineventId() {
		return joineventId;
	}

	public void setJoineventId(long joineventId) {
		this.joineventId = joineventId;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	
	

}
