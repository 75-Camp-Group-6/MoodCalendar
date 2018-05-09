<<<<<<< HEAD
var dat = new Date(); //当前时间
var nianD = dat.getFullYear();//当前年份
var yueD = dat.getMonth(); //当前月
var tianD = dat.getDate(); //当前天
window.onload=function(){
  add(); //进入页面第一次渲染
}
function add(){
  //console.log("add");
  document.getElementById('date').innerHTML = "";

  var nian = dat.getFullYear();//当前年份
  var yue = dat.getMonth(); //当前月
  var tian = dat.getDate(); //当前天
  var arr=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  document.getElementById('nian').innerText = nian;
  document.getElementById('yue').innerText = arr[yue];

  var setDat = new Date(nian,yue + 1,1 - 1); //把时间设为下个月的1号 然后天数减去1 就可以得到 当前月的最后一天;
  var setTian = setDat.getDate(); //获取 当前月最后一天
  var setZhou = new Date(nian,yue,1).getDay(); //获取当前月第一天 是 周几

  for(var i=0;i<setZhou ;i++){//渲染空白 与 星期 对应上
    var li=document.createElement('li');
    document.getElementById('date').appendChild(li);
  }

  for(var i=1;i<=setTian;i++){//利用获取到的当月最后一天 把 前边的 天数 都循环 出来
    var li=document.createElement('li');
    li.innerText = i;
    if(nian == nianD && yue == yueD && i == tianD){
      li.className = "active";
      //调用后台借口

    }else{
      li.className = "hover";
    }

    document.getElementById('date').appendChild(li);
  }

}
=======
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
>>>>>>> 029b66f4445eff8017cf95b57ceede3bf372083f
function next(){
  document.getElementById("next").onclick = function(){
    //console.log("add");
    //调用接口返回json
<<<<<<< HEAD
    dat.setMonth(dat.getMonth() + 1); //当点击下一个月时 对当前月进行加1;
    add(); //重新执行渲染 获取去 改变后的 年月日 进行渲染;
  };
=======
    nowtime.setMonth(nowtime.getMonth() + 1); //当点击下一个月时对当前月进行加1; 
    add();  
  }; 
>>>>>>> 029b66f4445eff8017cf95b57ceede3bf372083f
}
function prev(){
  document.getElementById("prev").onclick = function(){
    //调用接口返回json
<<<<<<< HEAD
    dat.setMonth(dat.getMonth() - 1); //与下一月 同理
    add();
  };
}

var date=getElementById('date');
date.onclick=function(event) {
  var day=event.target.innerText;
}
=======
    nowtime.setMonth(nowtime.getMonth() - 1); // 
    add();   
  };
}
>>>>>>> 029b66f4445eff8017cf95b57ceede3bf372083f
