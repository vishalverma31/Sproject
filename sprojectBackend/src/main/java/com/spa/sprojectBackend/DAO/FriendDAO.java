package com.spa.sprojectBackend.DAO;

import java.util.List;

import com.spa.sprojectBackend.model.Friend;

public interface FriendDAO {
	
    public void addFriend(Friend friend);
	public void updateFriend(Friend friend);
	public void deleteFriend(long id);
	public List<Friend> listMyFriends(long id);
	public Friend getFriend(long userId, long friendId);
	public List<Friend> listMyFriendRequests(long userId);
	public void setOnline(long userId);
	public void setOffline(long userId);

}
