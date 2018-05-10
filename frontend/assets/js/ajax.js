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
            send(method, url,async, data) {
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