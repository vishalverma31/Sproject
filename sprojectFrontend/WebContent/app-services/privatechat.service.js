angular
        .module('app')
        .service('PrivateChatService', function($q,$timeout,$rootScope) {
        
		var user=$rootScope.currentUser;
		var friendName=$rootScope.friendName;
		
		var service={}, listener= $q.defer(), socket={
		client: null,
		stomp: null
		}, messageIds=[];
		
		service.RECONNECT_TIMEOUT=30000;
		service.SOCKET_URL="/sprojectRest/chat";
		service.CHAT_TOPIC="/queue/message/"+user.username;
		service.CHAT_BROKER="/app/chat";
		
		service.receive=function(){
		   console.log("PChatService: receive")
		   return listener.promise;
		};
		
		service.send=function(message){
		   console.log("PChatService: send")
		   
		   var id=Math.floor(Math.random()*1000000);
		   
		   socket.stomp.send(service.CHAT_BROKER, {
		   priority: 9
		   }, JSON.stringify({
		      message: message,
			  username: user.username,
			  friendName:friendName,
			  id: id
			  }));
			messageIds.push(ids);
		};
		
		var reconnect= function() {
		console.log("PChatService: reconnect")
		$timeout(function() {
		   initialize();
		}, this.RECONNECT_TIMEOUT);
		};
		
		var getMessage= function(data){
		  console.log("PChatService: getMessage")
		  var message=JSON.parse(data), out= {};
		  out.message=message.message;
		  out.username=message.username;
		  out.time=new Date(message.time);
		  
		  return out;
		};
		
		var startListener= function(){
		   console.log("ChatService: receive")
		   socket.stomp.subscribe(service.CHAT_TOPIC, function(data) { 
		        listener.notify(getMessage(data.body));
			   });
		};
		
		var initialize= function() {
		    console.log("PChatService: initialize")
			socket.client= new SockJS(service.SOCKET_URL);
			socket.stomp= Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose= reconnect;
		};
		
		initialize();
		
		return service;
});                