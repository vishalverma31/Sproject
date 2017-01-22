package com.spa.sprojectRest.controller;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.spa.sprojectBackend.model.Message;
import com.spa.sprojectBackend.model.OutputMessage;

@Controller
public class ChatForumController {
	
	@MessageMapping("/chat")
	@SendTo("/topic/message")
	public OutputMessage sendMessage(Message message){
		
		System.out.println("Inside SendMessage()");
		return new OutputMessage(message,new Date());
		
	}

}
