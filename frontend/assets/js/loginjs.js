 /* jshint esversion: 6 */

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
}

class register{
	setAjax(Ajax){
		this.Ajax=Ajax;
	}
	register()
	{
Ajax.send("post",url,"type=login;username="+document.getElementById("username").value()+";"+"password="+document.getElementById("password").value()+";");
		return Ajax.getresponse();
	}
	tomain(){
		window.location.href="url?"+document.getElementById("username").value();
	}
	setcookie(valn,valp){
		document.cookie="username="+valn+";"+"password="+valp+";";
	}
	getcookie(){
		return document.cookie;
	}
}

var logins=new login();
var registers=new register();
var ajaxs=new Ajax();

function submit(){
	registers.setAjax(ajaxs);
	if(registers.register().equals("success")){
		registers.setcookie();
		window.location.href="url?"+document.getElementById("username").value();
	}else
		alert("注册失败，请重试");
}

function loginsend(){
	logins.setAjax(ajaxs);
	if(logins.logincheck().equals("success")){
		document.getElementById("login-table").style.display="none";
		document.getElementById("loginok").style.display="inherit";
		setTimeout(logins.setcookie(),3000);
		window.location.href="url?"+document.getElementById("username").value();
	}else{alert("登陆失败，请重试");}
}
