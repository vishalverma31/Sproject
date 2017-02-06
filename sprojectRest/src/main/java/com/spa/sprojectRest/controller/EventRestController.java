package com.spa.sprojectRest.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spa.sprojectBackend.DAO.EventDAO;
import com.spa.sprojectBackend.model.Event;

@RestController
public class EventRestController {
	
	@Autowired
	EventDAO eventDAO;
	
	//-------------------Create a Event--------------------------------------------------------
    
	@PostMapping(value = "/event/")
    public ResponseEntity<Void> createBlog(@RequestBody Event event) {
        event.setEventCreatedOn(new Date());
		eventDAO.addEvent(event);
        
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
	
	//-------------------Retrieve All Events--------------------------------------------------------
    
	@GetMapping(value="/event/")
    public ResponseEntity<List<Event>> listAllEvents() {
        List<Event> events=eventDAO.getListOfEvents();
        if(events.isEmpty()){
            return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
             //You may decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
    }
	
	//-------------------Retrieve All Events--------------------------------------------------------
    
	@GetMapping(value="/event/joined")
    public ResponseEntity<List<Event>> listJoinedEvents(HttpSession session) {
		long loggedInUserId=(Long)session.getAttribute("loggedInUserId");
		
		List<Event> events=eventDAO.getListofEventsJoined(loggedInUserId);
		
        if(events.isEmpty()){
            return new ResponseEntity<List<Event>>(HttpStatus.NO_CONTENT);
             //You may decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
    }

	//-------------------Retrieve Single Event--------------------------------------------------------
	@GetMapping(value="/event/{id}",produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> getEvent(@PathVariable("id") long id) {
        System.out.println("Fetching Event with id " + id);
         Event event=eventDAO.getEvent(id);
	        if (event == null) {
	            System.out.println("Event with id " + id + " not found");
	            return new ResponseEntity<Event>(HttpStatus.NOT_FOUND);
	        }
	        
		        return new ResponseEntity<Event>(event, HttpStatus.OK);
	    }
	
	//---------------------------Join the Event-------------------------------------
	@GetMapping(value = "/joinEvent/{eventId}")
	public ResponseEntity<Event> joinEvent(@PathVariable("eventId") long eventId,HttpSession session) 
	{
	  long loggedInUserId=(Long)session.getAttribute("loggedInUserId");
	  
	  eventDAO.joinEvent(loggedInUserId, eventId);
	  
	  return new ResponseEntity<Event>(HttpStatus.CREATED);
	}

}
