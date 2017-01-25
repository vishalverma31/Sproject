angular
        .module('app')
        .service('ChatService', function($q,$timeout,$rootScope) {
        
		var user=$rootScope.currentUser;
		
		var service={}, listener= $q.defer(), socket={
		client: null,
		stomp: null
		}, messageIds=[];
		
		service.RECONNECT_TIMEOUT=30000;
		service.SOCKET_URL="/sprojectRest/chat";
		service.CHAT_TOPIC="/topic/message";
		service.CHAT_BROKER="/app/chat";
		
		service.receive=function(){
		   console.log("ChatService: receive")
		   return listener.promise;
		};
		
		service.send=function(message){
		   console.log("ChatService: send")
		   
		   var id=Math.floor(Math.random()*1000000);
		   
		   socket.stomp.send(service.CHAT_BROKER, {
		   priority: 9
		   }, JSON.stringify({
		      message: message,
			  username: user.username,
			  id: id
			  }));
			messageIds.push(ids);
		};
		
		var reconnect= function() {
		console.log("ChatService: reconnect")
		$timeout(function() {
		   initialize();
		}, this.RECONNECT_TIMEOUT);
		};
		
		var getMessage= function(data){
		  console.log("ChatService: getMessage")
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
		    console.log("ChatService: initialize")
			socket.client= new SockJS(service.SOCKET_URL);
			socket.stomp= Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose= reconnect;
		};
		
		initialize();
});                