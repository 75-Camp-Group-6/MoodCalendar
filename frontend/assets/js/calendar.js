var nowtime = new Date(); //当前时间 
var yearD = nowtime.getFullYear();//当前年份 
var monthD = nowtime.getMonth(); //当前月 
var dayD = nowtime.getDate(); //当前天
window.onload=function(){ 
  document.getElementById("date").addEventListener("click",function(e){
    alert("调用ajax"+this.innerText);
  })
  add();  
} 
function add(){
  //console.log("add"); 
  document.getElementById('date').innerHTML = ""; 
  var yearN = nowtime.getFullYear();//当前年份 
  var monthN = nowtime.getMonth(); //当前月 
  var dayN = nowtime.getDate(); //当前天 
  var arr=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]; 
  document.getElementById('nian').innerText = yearN; 
  document.getElementById('yue').innerText = arr[monthN]; 
  var setDat = new Date(yearN,monthN + 1,1 - 1);  
  var setTian = setDat.getDate(); //获取 当前月最后一天 
  var setZhou = new Date(yearN,monthN,1).getDay(); 
  
  for(var i=0;i<setZhou ;i++){ 
    var li=document.createElement('li'); 
    document.getElementById('date').appendChild(li); 
  } 
  
  for(var i=1;i<=setTian;i++){ 
    var li=document.createElement('li'); 
    li.innerText = i; 
    if(yearN == yearD && monthN == monthD && i == dayD){ 
      li.className = "active";
      //调用后台借口
    }else{
      li.className = "hover"; 
    } 
    document.getElementById('date').appendChild(li); 
  } 
    
} 
function next(){
  document.getElementById("next").onclick = function(){ 
    //console.log("add");
    //调用接口返回json
    nowtime.setMonth(nowtime.getMonth() + 1); //当点击下一个月时对当前月进行加1; 
    add();  
  }; 
}
function prev(){
  document.getElementById("prev").onclick = function(){ 
    //调用接口返回json
    nowtime.setMonth(nowtime.getMonth() - 1); // 
    add();   
  };
}
