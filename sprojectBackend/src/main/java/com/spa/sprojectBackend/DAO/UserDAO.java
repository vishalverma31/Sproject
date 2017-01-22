package com.spa.sprojectBackend.DAO;

import java.util.List;

import com.spa.sprojectBackend.model.User;

public interface UserDAO {
	public void addUser(User user);
	public void updateUser(User user);
	public void deleteUser(User user);
	public List<User> listUsers();
	public List<User> listUsersById(long userId);
	public User getUserByUserId(long userId);
	public User getUserByUsername(String username);
	public boolean isExistingUser(User user);
	public boolean authenticate(String username, String password);
}
