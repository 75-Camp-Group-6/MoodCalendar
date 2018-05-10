class HSLColor {
  constructor (h, s, l) {
    this.setColor(h, s, l)
    this.getColor = this.getColor.bind(this)
    this.setColor = this.setColor.bind(this)
  }
  getColor () {
    return {h: this._h, s: this._s, l:this._l}
  }
  setColor (h, s, l) {
    this._h = this.HvalueControl(h)
    this._s = this.SLvalueControl(s)
    this._l = this.SLvalueControl(l)
  }
  HvalueControl (c) {
  	return Math.round(c) > 360 ? 360 : (Math.round(c) < 0 ? 0 : Math.round(c))
  }
  SLvalueControl (c) {
    return Math.round(c) > 100 ? 100 : (Math.round(c) < 0 ? 0 : Math.round(c))
  }
}
class Point {
  constructor (x, y) {
    this.setPoint(x, y)
    this.getPoint = this.getPoint.bind(this)
    this.setPoint = this.setPoint.bind(this)
  }
  getPoint () {
    if (this._x < 0 || this._y < 0) { return false }
    return {x: this._x, y: this._y}
  }
  setPoint (x, y) {
    this._x = x
    this._y = y
  }
}
class Vector {
  constructor (point1, point2, clientBox) {
    this._startPoint = point1  // Point类
    this._endPoint = point2
    this._clientBox = clientBox
    this.setVector(point1, point2)
    this.setVector = this.setVector.bind(this)
    this.getExtremePoints = this.getExtremePoints.bind(this)
    this.getClientBox = this.getClientBox.bind(this)
    this.setVector = this.setVector.bind(this)
    this.moveToNewPoint = this.moveToNewPoint.bind(this)
    this.setStartPoint = this.setStartPoint.bind(this)
    this.setEndPoint = this.setEndPoint.bind(this)
  }
  getVector () { return {vector: this._vector, length: this._length} }
  getExtremePoints () { return {startPoint: this._startPoint.getPoint(), endPoint: this._endPoint.getPoint()} }
  getClientBox () { return this._clientBox }
  setVector (point1, point2) {
    let p1 = point1.getPoint()
    let p2 = point2.getPoint()
    // 起始点和终点是否都有效
    if (p1 && p2) {
      this._vector = {
        x: (p2.x - p1.x) / this._clientBox.cW,  // [-1, 1]
        y: (p2.y - p1.y) / this._clientBox.cH   // [-1, 1]
      }
    } else {
      this._vector = {x: 0, y: 0}
    }
    this._length = Math.sqrt(this._vector.x ** 2 + this._vector.y ** 2)  // [0, 根号2]
  }
  moveToNewPoint (x, y) {
    let tmp_p = this._endPoint.getPoint()
    this._startPoint.setPoint(tmp_p.x, tmp_p.y)
    this._endPoint.setPoint(x, y)
    this.setVector(this._startPoint, this._endPoint)
  }
  setStartPoint (x, y) {
    this._startPoint.setPoint(x, y)
    this.setVector(this._startPoint, this._endPoint)
  }
  setEndPoint (x, y) {
    this._endPoint.setPoint(x, y)
    this.setVector(this._startPoint, this._endPoint)
  }
}
class Ball {
  constructor (originPosition, initBallColor) {
    this._originPosition = originPosition  // Point类
    this._currentPosition = originPosition
    if (initBallColor) {
      this._ballColor = initBallColor  // color类
    } else {
      this._ballColor = new Color(0, 100, 100)
    }
    this.getBallOriginPosition = this.getBallOriginPosition.bind(this)
    this.getBallCurrentPosition = this.getBallCurrentPosition.bind(this)
    this.getBallColor = this.getBallColor.bind(this)
    this.moveBall = this.moveBall.bind(this)
    this.setBallColor = this.setBallColor.bind(this)
  }
  getBallOriginPosition () { return this._originPosition.getPoint() }
  getBallCurrentPosition () { return this._currentPosition.getPoint() }
  getBallColor () { return this._ballColor.getColor() }
  moveBall (x, y) { this._currentPosition.setPoint(x, y) }
  setBallColor (h, s, l) { this._ballColor.setColor(h, s, l) }
}
let throttle = (fn, time = 300) => {
  let timer
  return (...args) => {
    if(timer == null){
      fn.apply(this,  args)
      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}
// 初始化球，绑定监听功能
let initBall = ($touchBox, $ball, ...args) => {
  let clientBox = {
    cW: $touchBox.clientWidth,
    cH: $touchBox.clientHeight
  }
  let originPosition = new Point(0, 0)
  let ballColor = args.length ? new HSLColor(...args) : new HSLColor(0, 100, 100)
  let ball = new Ball (originPosition, ballColor)
  changeBallColor($ball, ball.getBallColor())
  let moveVector = new Vector (new Point(-1, -1), new Point(-1, -1), clientBox)
  $touchBox.addEventListener('touchstart', (event) => {
    // moveVector.setEndPoint(event.touches[0].clientX, event.touches[0].clientY)  // 方案1
    moveVector.setStartPoint(event.touches[0].clientX, event.touches[0].clientY)   // 方案2
  })
  $touchBox.addEventListener('touchmove', throttle((event) => {
    // moveVector.moveToNewPoint(event.touches[0].clientX, event.touches[0].clientY)  // 方案1
    moveVector.setEndPoint(event.touches[0].clientX, event.touches[0].clientY)        // 方案2
    moveDecideColor(moveVector, ball, $ball, 100)
    ballMove(moveVector, ball, $ball, 1.4)
  }))
  $touchBox.addEventListener('touchend', (event) => {
    moveVector.setStartPoint(-1, -1)
    moveVector.setEndPoint(-1, -1)
    ballBack(ball, $ball)
  })
  return ball
}
// 获取球颜色
let getBallColor = (ball) => { return ball.getBallColor() }
// 改变球的颜色
let changeBallColor = ($target, color) => {
  $target.style.background = 'radial-gradient(at 15vW 0rem, transparent, hsl(' + color.h + ', ' + color.s + '%, ' + color.l + '%) 80%, #999)'
  $target.style.boxShadow = '0 0 1rem 0.1rem hsl(' + color.h + ', ' + color.s + '%, ' + color.l + '%)'
} 
// 根据移动控制颜色
let moveDecideColor = (moveVector, ball, $ball, extent) => {
  let v = moveVector.getVector()
  let vectorLen = v.length,  // [0, 根号2]
      vx = v.vector.x,  // [-1, 1]
      vy = v.vector.y   // [-1, 1]
  // x, y坐标系换算极坐标系
  let sin = Math.asin(vy / vectorLen), rad
  if (sin >= 0 && vx >= 0) { rad = sin }  // 第一象限
  if (vx < 0) { rad = Math.PI - sin }  // 第二、三象限
  if (sin < 0 && vx >= 0) { rad = Math.PI * 2 + sin }  // 第四象限
  let h = rad / Math.PI * 180
      s = 70
      l = (1 - vectorLen / Math.sqrt(2)) * 90
  ball.setBallColor(h, s, l)
  changeBallColor($ball, ball.getBallColor())
}
// 改变球position: relative的位置
let changeBallPosition = ($ball, x, y) => {
  $ball.style.left = x + 'rem'
  $ball.style.top = y + 'rem'
}
// 微移球的位置
let ballMove = (moveVector, ball, $ball, extent) => {
  let p = moveVector.getExtremePoints().endPoint
  let clientBox = moveVector.getClientBox()
  let px = (p.x - clientBox.cW / 2) / clientBox.cW * 2,  // [-1, 1]
      py = (p.y - clientBox.cH / 2) / clientBox.cW * 2   // [-1, 1]
  let x = px * extent, y = py * extent
  changeBallPosition($ball, x, y)
}
// 求返回初始位置
let ballBack = (ball, $ball) => {
  let originPosition = ball.getBallOriginPosition()
  changeBallPosition($ball, originPosition.x, originPosition.y)
}
// 使用示例
window.onload = function () {
  let ball = initBall(document.querySelector('article'), document.getElementById("moodBall"))
}