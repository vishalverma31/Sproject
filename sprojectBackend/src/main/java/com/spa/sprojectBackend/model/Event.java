package com.spa.sprojectBackend.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="EventDetails", schema="DBSPA")
public class Event {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long eventId;
	private String eventTitle;
	private String eventDescription;
	private Date eventDateTime;
	
	private Date eventCreatedOn;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="userId")
	private User createdBy;
	
	@OneToMany(fetch=FetchType.EAGER,mappedBy="event",cascade=CascadeType.ALL)
	@JoinColumn(name="userId")
	private List<User> joinedBy;

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}

	public String getEventTitle() {
		return eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public String getEventDescription() {
		return eventDescription;
	}

	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}

	public Date getEventDateTime() {
		return eventDateTime;
	}

	public void setEventDateTime(Date eventDateTime) {
		this.eventDateTime = eventDateTime;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public List<User> getJoinedBy() {
		return joinedBy;
	}

	public void setJoinedBy(List<User> joinedBy) {
		this.joinedBy = joinedBy;
	}

	public Date getEventCreatedOn() {
		return eventCreatedOn;
	}

	public void setEventCreatedOn(Date eventCreatedOn) {
		this.eventCreatedOn = eventCreatedOn;
	}
	
	

}
