package com.spa.sprojectRest.controller;

import java.util.List;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spa.sprojectBackend.DAO.FriendDAO;
import com.spa.sprojectBackend.DAO.UserDAO;
import com.spa.sprojectBackend.model.Friend;

@RestController
public class FriendRestController {
	
	@Autowired
	FriendDAO friendDAO;
	
	@Autowired
	UserDAO userDAO;
	
	
	
	@GetMapping(value="/addfriend/{friendId}")
	public ResponseEntity<Friend> sendFriendRequest(@PathVariable("friendId") long friendId, HttpSession session){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserID");
		
		Friend friend=new Friend();
		friend.setUser(userDAO.getUserByUserId(loggedInUserID));
		friend.setStatus("New");
		friend.setFriend(userDAO.getUserByUserId(friendId));
		friend.setIsOnline(false);
		
		friendDAO.addFriend(friend);
		
		return new ResponseEntity<Friend>(friend,HttpStatus.OK);
	}
	
	@GetMapping(value="/getMyFriendrequests/")
	public ResponseEntity<List<Friend>> getMyFriendrequests(HttpSession session){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserID");
		
		List<Friend> myFriendRequests=friendDAO.listMyFriendRequests(loggedInUserID);
		
		return new ResponseEntity<List<Friend>>(myFriendRequests,HttpStatus.OK);
	}
	
	@GetMapping(value="/acceptFriend/{friendId}")
	public ResponseEntity<Friend> acceptFriendRequest(@PathVariable("friendId") long friendId,HttpSession session){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserID");
		
		Friend friend=friendDAO.getFriend(loggedInUserID, friendId);
		friend.setStatus("Accepted");
		friendDAO.updateFriend(friend);
		
		return new ResponseEntity<Friend>(friend,HttpStatus.OK);
	}
	
	@GetMapping(value="/rejectFriend/{friendId}")
	public ResponseEntity<Friend> rejectFriendRequest(@PathVariable("friendId") long friendId,HttpSession session){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserID");
		
		Friend friend=friendDAO.getFriend(loggedInUserID, friendId);
		friend.setStatus("Rejected");
		friendDAO.updateFriend(friend);
		
		return new ResponseEntity<Friend>(friend,HttpStatus.OK);
	}
	
	@GetMapping(value="/myFriends/")
	public ResponseEntity<List<Friend>> myFriends(HttpSession session){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserID");
		
		List<Friend> myFriends=friendDAO.listMyFriends(loggedInUserID);
		
		if(myFriends.isEmpty()){
			return new ResponseEntity<List<Friend>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Friend>>(myFriends,HttpStatus.OK);
	}
	
	

}
