import { Ajax } from "./loginjs.js";
let colorResponse = ['#C0C0C0', '#5E2612', '#8B4513'];//传过来的颜色数据示例

/**
 * @class Calender
 * @param containerid:包裹日历的容器id
 * @param bacColors：一个月的日历背景演示hsl
 * @param dat：当前选择的时间
 */
class Calender{
    constructor(bacColors=[]){
        this.date=document.getElementById('date');
        this.bacColors = bacColors;
        // this.container = document.getElementById(containerid);
        // this.container.innerHTML=this.render(bacColors.data);
        this.dat=new Date();
        var nianD = this.dat.getFullYear(); //当前年份
        var yueD = this.dat.getMonth(); //当前月
        var tianD = this.dat.getDate(); //当前天
        /*this.date.onclick = function (event) {
            let clickDay = event.target.innerText; //获取到被点击的日期是几号
            let clickMonth=this.dat.getMonth();
            let clickYear=this.dat.getFullYear();
            let clickDate=clickYear+'-'+clickMonth+'-'+clickDay;//发送ajax请求的日期格式是 年-月-日
            Ajax.send('get', '', async, clickDate);
            this.bacColors = Ajax.getreponse();
            this.add();

        }*/
    }
    // render(){
    //     const bacColors=this.bacColors.data;
    //     const container=bacColors.map(bacColor=>{
    //         `<ul id="date"></ul>`.trim()
    //     });

    // }
    // registerPlugins(...plugins){

    // }

    add() {
        document.getElementById('date').innerHTML = "";
        let nian = this.dat.getFullYear(); //当前年份
        let yue = this.dat.getMonth(); //当前月
        let tian = this.dat.getDate(); //当前天
        let arr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        document.getElementById('nian').innerText = nian;
        document.getElementById('yue').innerText = arr[yue];
        let setDat = new Date(nian, yue + 1, 1 - 1); //把时间设为下个月的1号 然后天数减去1 就可以得到 当前月的最后一天;
        let setTian = setDat.getDate(); //获取 当前月最后一天
        let setZhou = new Date(nian, yue, 1).getDay(); //获取当前月第一天 是 周几
        for (let i = 0; i < setZhou; i++) { //渲染空白 与 星期 对应上,渲染一个表格
            let li = document.createElement('li');
            document.getElementById('date').appendChild(li);
        }
        for (let i = 1; i <= setTian; i++) { //利用获取到的当月最后一天 把 前边的 天数 都循环 出来
            let li = document.createElement('li');
            li.innerText = i;//写一个月的日期
            if(this.bacColors){
                li.style.backgroundColor = this.bacColors[i - 1];
            }

            if (nian == this.nianD && yue == this.yueD && i == this.tianD) {
                li.className = "active";
                //调用后台借口
            } else {
                li.className = "hover";
            }
            document.getElementById('date').appendChild(li);
        }
    }

    next() {
        document.getElementById("next").onclick = function () {
            //console.log("add");
            //调用接口返回json
            dat.setMonth(dat.getMonth() + 1); //当点击下一个月时 对当前月进行加1;
            this.add(); //重新执行渲染 获取去 改变后的 年月日 进行渲染;
        };
    }

    prev() {
        document.getElementById("prev").onclick = function () {
            //调用接口返回json
            dat.setMonth(dat.getMonth() - 1); //与下一月 同理
            this.add();
        };
    }

};

window.onload=function() {
    const calender = new Calender(colorResponse);
    calender.add();
}


// const pluginPrevious = {
//     render(bacColor){

//     }
// };

// const pluginNext = {
//     render(bacColor) {

//     }
// }