package com.spa.sprojectBackend.model;

import java.util.Date;

public class PrivateMessage extends Message{
	
	private String friendName;
	private Date dateTime;
	
	public PrivateMessage() {
		
	}
	
	public PrivateMessage(Message original, String friendName, Date dateTime) {
		super(original.getMessageId(),original.getUsername(),original.getMessage());
		this.friendName = friendName;
		this.dateTime = dateTime;
	}
	public String getFriendName() {
		return friendName;
	}
	public void setFriendName(String friendName) {
		this.friendName = friendName;
	}
	public Date getDateTime() {
		return dateTime;
	}
	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	
	

}
