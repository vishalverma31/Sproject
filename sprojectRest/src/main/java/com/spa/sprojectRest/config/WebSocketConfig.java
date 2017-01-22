package com.spa.sprojectRest.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
@ComponentScan("com.spa")
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer{

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config){
		System.out.println("Starting method configureMessageBroker");
		
		config.enableSimpleBroker("/topic","/queue");
		config.setApplicationDestinationPrefixes("/app");
	
		System.out.println("Ending method configureMessageBroker");
		
	}
	
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		System.out.println("Starting method registerStompEndpoints");
		
		registry.addEndpoint("/chat").withSockJS();
		registry.addEndpoint("/chat_forum").withSockJS();
		
		System.out.println("Ending method registerStompEndpoints");
			
	}

}
