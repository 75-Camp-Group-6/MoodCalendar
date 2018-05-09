class Color {
  constructor (r, g, b) {
    this.setColor(r, g, b)
    this.getColor = this.getColor.bind(this)
    this.setColor = this.setColor.bind(this)
  }
  getColor () {
    return {r: this._r, g: this._g, b:this._b}
  }
  setColor (r, g, b) {
    this._r = this.valueControl(r)
    this._g = this.valueControl(g)
    this._b = this.valueControl(b)
  }
  valueControl (c) {
    return Math.round(c) > 255 ? 255 : ( Math.round(c) < 0 ? 0 : Math.round(c))
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
class Line {
  constructor (point1, point2, clientBox) {
    this._startPoint = point1  // Point类
    this._endPoint = point2
    this._clientBox = clientBox
    this.setLine(point1, point2)
    this.getLine = this.getLine.bind(this)
    this.getExtremePoints = this.getExtremePoints.bind(this)
    this.getClientBox = this.getClientBox.bind(this)
    this.setLine = this.setLine.bind(this)
    this.moveToNewPoint = this.moveToNewPoint.bind(this)
    this.setStartPoint = this.setStartPoint.bind(this)
    this.setEndPoint = this.setEndPoint.bind(this)
  }
  getLine () { return {vector: this._vector, length: this._length} }
  getExtremePoints () { return {startPoint: this._startPoint.getPoint(), endPoint: this._endPoint.getPoint()} }
  getClientBox () { return this._clientBox }
  setLine (point1, point2) {
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
    this.setLine(this._startPoint, this._endPoint)
  }
  setStartPoint (x, y) { this._startPoint.setPoint(x, y) }
  setEndPoint (x, y) { this._endPoint.setPoint(x, y) }
}
class Ball {
  constructor (originPosition, initBallColor) {
    this._originPosition = originPosition  // Point类
    this._currentPosition = originPosition
    if (initBallColor) {
      this._ballColor = initBallColor  // color类
    } else {
      this._ballColor = new Color(255, 255, 255)
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
  setBallColor (r, g, b) { this._ballColor.setColor(r, g, b) }
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
  let ballColor = args.length ? new Color(...args) : new Color(255, 255, 255)
  let ball = new Ball (originPosition, ballColor)
  changeBallColor($ball, ball.getBallColor())
  let moveVector = new Line (new Point(-1, -1), new Point(-1, -1), clientBox)
  $touchBox.addEventListener('touchstart', (event) => {
    moveVector.setEndPoint(event.touches[0].clientX, event.touches[0].clientY)
  })
  $touchBox.addEventListener('touchmove', throttle((event) => {
    moveVector.moveToNewPoint(event.touches[0].clientX, event.touches[0].clientY)
    moveDecideColor(moveVector, ball, $ball, 120)
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
  if (color.r === 255 && color.g === 255 && color.b === 255) {
    $target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
  } else {
    $target.style.backgroundColor = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')'
  }
} 
// 根据移动控制颜色
let moveDecideColor = (moveVector, ball, $ball, extent) => {
  let v = moveVector.getLine()
  let vectorLen = v.length,  // [0, 根号2]
      vx = v.vector.x,  // [-1, 1]
      vy = v.vector.y   // [-1, 1]
  // x, y坐标系换算极坐标系
  let sin = Math.asin(vy / vectorLen), rad
  if (sin >= 0 && vx >= 0) { rad = sin }  // 第一象限
  if (vx < 0) { rad = Math.PI - sin }  // 第二、三象限
  if (sin < 0 && vx >= 0) { rad = Math.PI * 2 + sin }  // 第四象限
  // 判断在六分象限的何处
  let r_step = g_step = b_step = 0
  switch (true) {
    case rad <= (Math.PI / 6) :
      g_step = vectorLen * extent
      break
    case rad <= (Math.PI / 2) :
      b_step = vectorLen * extent
      break
    case rad <= (Math.PI * 5 / 6) :
      r_step = vectorLen * extent
      break
    case rad <= (Math.PI * 7 / 6) :
      g_step = - vectorLen * extent
      break
    case rad <= (Math.PI * 3 / 2) :
      b_step = - vectorLen * extent
      break
    case rad <= (Math.PI * 11 / 6) :
      r_step = - vectorLen * extent
      break
    default:
      g_step = vectorLen * extent
      break
  }
  // 改变
  let color = ball.getBallColor()
  ball.setBallColor(color.r + r_step, color.g + b_step, color.b + g_step)
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
  let originPosition = ball.getBallOriginPosition(),
      currentPosition = ball.getBallCurrentPosition()
  let x = currentPosition.x - originPosition.x,
      y = currentPosition.y - originPosition.y
  changeBallPosition($ball, x, y)
}
// 使用示例
window.onload = function () {
  let ball = initBall(document.querySelector('article'), document.getElementById("moodBall"))
}