/**
 * @class Calender
 * @param containerid:包裹日历的容器id
 * @param bacColor：一个月的日历背景演示hsl
 * @param date：当前选择的时间
 */
class Calender{
    constructor(containerid,bacColor={data:[]}){
        this.bacColor = bacColor;
        this.container = document.getElementById(containerid);
        this.container.innerHTML=this.render(bacColor.data);
        //this.date=showDate(new Date());
    }
    render(){

    }
    registerPlugins(...plugins){

    }

};

const pluginPrevious = {
    render(bacColor){

    }
};

const pluginNext = {
    render(bacColor) {

    }
}