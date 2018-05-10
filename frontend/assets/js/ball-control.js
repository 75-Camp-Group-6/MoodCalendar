// 导入ballMoudle, Ajax
import {initBall, setBallColor, getBallColor} from "./ballModule.js"
import {Ajax} from "./loginjs.js"
// 页面加载完成
window.onload = function () {
  let Ajax = new Ajax()
  // 怎么用？获得回调后初始化球、文本框：
  let ball = initBall(document.querySelector('.ball article'), document.getElementById("moodBall"))
  let textarea = document.querySelector('.ball textarea')
  // 绑定按钮事件
  let submit_btn = document.querySelector('.ball .submit')
  let next_btn = document.querySelector('.ball .view')
  submit_btn.addEventListener('click', () => {
    // 获取当前值并提交
    let color = getBallColor(ball)
    let text = textarea.innerHTML
    // 页面跳转
    window.location.href="" 
  })
  next_btn.addEventListener('click', () => {
    // 页面跳转
    window.location.href="" 
  })
}