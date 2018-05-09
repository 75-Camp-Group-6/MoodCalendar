class HSLColor {
  constructor (H, S, L) {
    this._H = this.HValueJudge(H)
    this._S = this.SLValueJudge(S)
    this._L = this.SLValueJudge(L)
    this.getHSLColor = this.getHSLColor.bind(this)
    this.setHSLColor = this.setHSLColor.bind(this)
    this.SLValueJudge = this.SLValueJudge.bind(this)
    this.HValueJudge = this.HValueJudge.bind(this)
  }
  getHSLColor () {
    return {h: this._H, s: this._S, l: this._L}
  }
  setHSLColor (H, S, L) {
    this._H = this.HValueJudge(H)
    this._S = this.SLValueJudge(S)
    this._L = this.SLValueJudge(L)
  }
  HValueJudge (n) {  // [0, 360]
    return Math.round(n) > 360 ? 360 : (Math.round(n) < 0 ? 0 : Math.round(n))
  }
  SLValueJudge (n) {  // [0, 100]
    return Math.round(n) > 100 ? 100 : (Math.round(n) < 0 ? 0 : Math.round(n))
  }
}
class Point extends HSLColor {
  constructor (x, y, clientSize) {
    super(0, 0, 0)
    this._cW = clientSize.cW
    this._cH = clientSize.cH
    this._x = x
    this._y = y
    this.getPoint = this.getPoint.bind(this)
    this.setPoint = this.setPoint.bind(this)
    this.setHSLColor = this.setHSLColor.bind(this)
    // 有效点设置对应颜色
    if (this._x >= 0 && this._y >= 0) this.setHSLColor()
  }
  getPoint () {
    if (this._x < 0 || this._y < 0) {
      return false
    } else {
      return {x: this._x, y: this._y}
    }
  }
  setPoint (x, y) {
    this._x = x
    this._y = y
    if (this._x >= 0 && this._y >= 0) {
      this.setHSLColor()  // 有效点设置对应颜色
    } else {
      super.setHSLColor(0, 80, 100)
    }
  }
  setHSLColor (...args) {
    if (args.length) {
      super.setHSLColor(...args)
    } else {
      let h, s = 35, l
      // 平移、无量纲化坐标系
      let x = (this._x - this._cW * 0.5) / this._cW * 2,  // [-1, 1]
          y = (this._y - this._cH * 0.3) / this._cH * 2  // [-1, 1]
      // 转换极坐标系
      let r = Math.sqrt(x ** 2 + y ** 2),  // [0, 根号2]
          p = Math.asin(y / r)  // [-Pi/2, Pi/2]
      // 判断象限, [0, 2Pi]
      if (x >= 0 && y >= 0) p = p
      if (x < 0 && y >= 0) p = Math.PI - p
      if (x >= 0 && y < 0) p = Math.PI * 2 + p
      if (x < 0 && y < 0) p = Math.PI - p
      // 定义h: [0, 360], l: [40, 100]
      h = p / Math.PI * 180
      l = 100 - r / Math.sqrt(2) * 60
        super.setHSLColor(h, s, l)
    }
  }
}
class Ball extends Point{
  constructor (clientSize) {
    super(-1, -1, clientSize)
    this.setBallHSLColor = this.setBallHSLColor.bind(this)
    this.getBallHSLColor = this.getBallHSLColor.bind(this)
  }
  setBallHSLColor (h, s, l) { super.setHSLColor(h, s, l) }
  getBallHSLColor () { return super.getHSLColor() }
}
let throttle = (fn, time = 500) => {
  let timer;
  return (...args) => {
    if (timer == null) {
      fn.apply(this,  args)
      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}
let changeBgColor = (target, obj) => {
  target.style.backgroundColor = 'hsl(' + obj.h + ', ' + obj.s + '%, ' + obj.l + '%)'
}
let initBall = ($screen, $ball, ...args) => {
  let clientSize = {
    cW: $screen.clientWidth,
    cH: $screen.clientHeight
  }
  let ball = new Ball(clientSize)
  if (args.length) {
    ball.setBallHSLColor(...args)
    changeBgColor($ball, ball.getBallHSLColor())
  }
  $screen.addEventListener('touchmove', throttle(() => {
    ball.setPoint(event.touches[0].clientX, event.touches[0].clientY)
    changeBgColor($ball, ball.getHSLColor())
  }))
  return ball
}
let getBallColor = (ball) => { return ball.getHSLColor() }
window.onload = function () {
  let ball = initBall(document.querySelector('article'), document.getElementById('moodBall'))
  let sub_btn = document.querySelector('aside .line .submit')
  sub_btn.addEventListener('click', () => {
    console.log(getBallColor(ball))
  })
}