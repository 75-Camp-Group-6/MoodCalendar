/**
 * @class Calender
 * @param bacColors：一个月的日历背景颜色的数组
 * @param dat：当前选择的时间
 * @流程：初始化：更新表格数字、颜色、心情text填入今日的心情记录，
 *        点击上个月、 下个月： 触发点击事件prev()、next()，并更新视图
 *        点击查看其他天的心情： 触发click1()函数，获取选中天的心情text并更新视图
 */
class Calender{
    constructor(){
        this.date=document.getElementById('date');
        this.moodText = this.getText(new Date());//今日的心情
        // this.container = document.getElementById(containerid);
        // this.container.innerHTML=this.render(bacColors.data);
        this.dat=new Date();
        var nianD = this.dat.getFullYear(); //当前年份
        var yueD = this.dat.getMonth(); //当前月
        var tianD = this.dat.getDate(); //当前天
        this.bacColors = this.getColors(nianD + '-' + yueD);//获取一个月的颜色
    }

    /**
     * 功能：更新视图:上个月、下个月、每个表格单元颜色、心情text
     */
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
            li.innerText = i;//写一个月的日期，1-30天
            if(this.bacColors){ //渲染每个表格单元的背景颜色
                li.style.backgroundColor = this.bacColors[i - 1];
            }
            if (this.moodText){//填入心情
                document.getElementById('note').innerHTML = this.moodText;
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
            this.dat.setMonth(this.dat.getMonth() + 1); //当点击下一个月时 对当前月进行加1;
            this.bacColors = this.getColors(this.dat.getFullYear()+'-'+this.dat.getMonth());
            this.add(); //重新执行渲染 获取去 改变后的 年月日 进行渲染;
    }
    prev() {//调用接口返回json
            this.dat.setMonth(this.dat.getMonth() - 1); //与下一月 同理
            this.bacColors = this.getColors(this.dat.getFullYear() + '-' + this.dat.getMonth());
            this.add();
    }
    /**
     * 功能：发送ajax请求获取选中天的心情text
     * @param exactDate 选中天的时间， 如 2018 - 03
     * @return 返回选中天2018 - 03 的心情text， 直接返回string
     */
    getText(exactDate){
        //const ajax = new Ajax();
        //ajax.send('get', 'getText', 'async', exactDate);
        //let result = ajax.getreponse(); //接收到的格式是{ "code": xx, "text": "xxxxx"] }
        return exactDate +"哎，今天心情不好啊"; //正式请求时用：return result[text];
    }

    /**
     *
     * @param exactMonth 当前月， 如 2018 - 03
     * @return 输出： 2018 - 03 这个月的背景颜色数组
     */
    getColors(exactMonth){
        //const ajax = new Ajax();
        //正式代码：ajax.send('get', 'getText', 'async', exactDate);
        //正式代码：let colorResponse = ajax.getreponse();
        //测试返回示例
        let colorResponse = [
            {
                day: '1',
                color: '#5E2612'
            },
            {
                day: '2',
                color: '#5E2612'
            },
            {
                day: '4',
                color: '#8B4513'
            }
        ]; //此处应该是ajax请求传过来的颜色数据示例
        let colorArr=Array.from({length:31});//创建31天空数组
        for (let i = 0; i < colorResponse.length;i++){
            colorArr[colorResponse[i].day-1] = colorResponse[i].color;//往数组填充有颜色的天的背景色
        }
        return colorArr;
    }

    click1 (event) {
            let x = event.target;
            let d = this.dat.getFullYear() + "-" + (this.dat.getMonth()+1) + "-" + x.innerText;
            let text= this.getText(d);//获取心情text
            this.moodText = text;
            this.add();//更新视图

    }
};

window.onload=function() {

    const calender = new Calender();
    calender.add();
    document.getElementById("date").onclick = function(event) {
        calender.click1(event);
    }
    document.getElementById("prev").onclick = function () {
        calender.prev();
    }
    document.getElementById("next").onclick = function () {
        calender.next();
    }
    document.getElementById("returnto").onclick = function () {
        window.history.back(-1);
    }
}
