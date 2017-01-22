package com.spa.sprojectBackend.model;

public class Message {
	
	private int messageId;
	private String username;
	private String message;
	
	public Message(){ 
		
	}
	
	public Message(int messageId, String username, String message) {
		super();
		this.messageId = messageId;
		this.username = username;
		this.message = message;
	}
	
	public int getMessageId() {
		return messageId;
	}
	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
