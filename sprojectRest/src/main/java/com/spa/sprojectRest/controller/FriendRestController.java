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
	
	@Autowired
	HttpSession session;
	
	//============ Adding Friend ===========================
	
	@GetMapping(value="/addFriend/{friendId}")
	public ResponseEntity<Friend> sendFriendRequest(@PathVariable("friendId") long friendId){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserId");
		System.out.println("loggedInUserId="+loggedInUserID);
		
		Friend friend=new Friend();
		friend.setUser(userDAO.getUserByUserId(loggedInUserID));
		friend.setStatus("New");
		friend.setFriend(userDAO.getUserByUserId(friendId));
		friend.setIsOnline(false);
		
		friendDAO.addFriend(friend);
		
		return new ResponseEntity<Friend>(friend,HttpStatus.OK);
	}
	
	//====================Getting friend requests==================
	
	@GetMapping(value="/getMyFriendRequests/")
	public ResponseEntity<List<Friend>> getMyFriendrequests(){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserId");
		
		List<Friend> myFriendRequests=friendDAO.listMyFriendRequests(loggedInUserID);
		if(myFriendRequests.isEmpty()){
			return new ResponseEntity<List<Friend>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Friend>>(myFriendRequests,HttpStatus.OK);
	}
	
	//================Accepting Friend Request=======================
	
	@GetMapping(value="/acceptFriend/{friendId}")
	public ResponseEntity<Friend> acceptFriendRequest(@PathVariable("friendId") long friendId){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserId");
		
		Friend friend=friendDAO.getFriend(loggedInUserID, friendId);
		friend.setStatus("Accepted");
		friendDAO.updateFriend(friend);
		
		return new ResponseEntity<Friend>(friend,HttpStatus.OK);
	}
	
	//================Rejecting Friend Request=======================
	
	@GetMapping(value="/rejectFriend/{friendId}")
	public ResponseEntity<Friend> rejectFriendRequest(@PathVariable("friendId") long friendId){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserId");
		
		Friend friend=friendDAO.getFriend(loggedInUserID, friendId);
		friend.setStatus("Rejected");
		friendDAO.updateFriend(friend);
		
		return new ResponseEntity<Friend>(friend,HttpStatus.OK);
	}
	
	//================List of Friends=======================
	
	@GetMapping(value="/myFriends")
	public ResponseEntity<List<Friend>> myFriends(){
		long loggedInUserID=(Long)session.getAttribute("loggedInUserId");
		
		List<Friend> myFriends=friendDAO.listMyFriends(loggedInUserID);
		
		if(myFriends.isEmpty()){
			return new ResponseEntity<List<Friend>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Friend>>(myFriends,HttpStatus.OK);
	}
	
	

}
