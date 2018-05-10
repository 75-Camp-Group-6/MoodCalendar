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
function next(){
  document.getElementById("next").onclick = function(){
    //console.log("add");
    //调用接口返回json
    dat.setMonth(dat.getMonth() + 1); //当点击下一个月时 对当前月进行加1;
    add(); //重新执行渲染 获取去 改变后的 年月日 进行渲染;
  };
}
function prev(){
  document.getElementById("prev").onclick = function(){
    //调用接口返回json
    dat.setMonth(dat.getMonth() - 1); //与下一月 同理
    add();
  };
}

var date=getElementById('date');
date.onclick=function(event) {
  var day=event.target.innerText;
}
