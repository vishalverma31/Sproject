package com.spa.sprojectRest.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.spa.sprojectBackend.model.Message;
import com.spa.sprojectBackend.model.OutputMessage;
import com.spa.sprojectBackend.model.PrivateMessage;

@Controller
public class ChatForumController {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate; 
	
	@MessageMapping("/chat")
	public void sendPrivateMessage(PrivateMessage pMessage){
		
		pMessage.setDateTime(new Date());
		System.out.println("Inside SendPrivateMessage()");
		System.out.println("UserName:"+pMessage.getUsername());
		System.out.println("FriendName:"+pMessage.getFriendName());
		System.out.println("Message:"+pMessage.getMessage());
		
		simpMessagingTemplate.convertAndSend("/queue/message/"+pMessage.getUsername(), pMessage);
		simpMessagingTemplate.convertAndSend("/queue/message/"+pMessage.getFriendName(), pMessage);
		
	}
	
	@MessageMapping("/chat_forum")
	@SendTo("/topic/message")
	public OutputMessage sendMessage(Message message){
		
		System.out.println("Inside SendMessage()");
		return new OutputMessage(message,new Date());
		
	}

}
