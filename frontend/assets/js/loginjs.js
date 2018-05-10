 /* jshint esversion: 6 */


 class Ajax  {
    constructor(xhr){
         xhr = new XMLHttpRequest();
         this.xhr = xhr;
     }
	   setData(data){
		 this.data=data;
	  }
		settype(type){
			this.type=type;
		}
  		setlogin(login){
			this.login=login;
		}
            send(method, url, async, data) {
         let xhr = this.xhr;

         xhr.onreadystatechange = () => {
             // readyState: 0: init, 1: connect has set up, 2: recive request, 3: request.. , 4: request end, send response
             if (xhr.readyState === 4 && xhr.status === 200) {
                 // status: 200: OK,  404: Not Found Page
				this.reaponse=xhr.responseText;
             }
         };

         xhr.open(method, url, async);
         xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         xhr.send(data);
     }
	 getreponse(){
		 return this.response;
	 }
 }
export {Ajax};

class login{
	 constructor(){

	 }
	//
	setAjax(Ajax){
		this.Ajax=Ajax;
	}
	logincheck()
	{
Ajax.send("post",url,"type=login;username="+document.getElementById("username").value()+";"+"password="+document.getElementById("password").value()+";");
	}
	setcookie(valn,valp){
		document.cookie="username="+valn+";"+"password="+valp+";";
	}
	getcookie(){
		return document.cookie;
	}
	success(){
		if(Ajax.getreponse().equals("success")){
			document.getElementById("login").style.display="none";
			document.getElementById("loginok").style.display="inherit";
			setTimeout(window.open("index?username="+document.getElementById("username").value()),2000);
			window.close();
		}
	}
	toregister(){
		window.open("register.html");
	}
}

class register{

}
