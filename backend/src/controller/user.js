const Base = require('./base.js');

module.exports = class extends Base {
  async __before() {
    if (this.ctx.action === 'login' || this.ctx.action === 'signup') {
      return;
    }
    let userInfo = await this.session('userinfo') || {};
    if (think.isEmpty(userInfo)) {
      return this.fail('NOT_LOGIN');
    }

    this.header('Access-Control-Allow-Origin', '*');
  }

  async indexAction() {
    let userinfo = await this.session('userinfo');
    if (!think.isEmpty(userinfo)) {
      this.success(userinfo, 'Done1');
    } else {
      this.fail(11, `Didn't match`, {});
    }
  }

  async getStatsAction() {
    let userinfo = await this.session('userinfo');
    if (!think.isEmpty(userinfo)) {
      this.success({
        errno: 0,
        errmsg: 'Logi'
      }, 'Done1');
    } else {
      this.fail(11, `Didn't match`, {});
    }
  }

  async loginAction() {
    const user = this.mongo('user');
    if (this.isPost) {
      let username = this.post('username');
      let pwd = this.post('pwd');
      let data = await this.model('user').where({
        username: username,
        pwd: pwd
      }).find();
      if (think.isEmpty(data)) {
        return this.fail(403, 'Login Fail', {});
      } else {
        this.session('userinfo', data);
        return this.success({}, 'Login Succeed！');
      }
    } else {
      return this.fail(400, 'Bad Request');
    }
  }

  async logoutAction() {
    await this.session(null);
    return this.success({}, 'Logout succeed');
  }

  async signupAction() {
    const user = this.mongo('user');
    user._pk = 'username';
    let username = this.post('username');
    let pwd = this.post('pwd');
    if (!think.isEmpty(await user.find({
      username: username
    }))) {
      return this.fail(15, 'Username existed', {});
    } else {
      const insertId = await user.add({
        username: username,
        pwd: pwd
      });
      return this.success({}, 'Signup Succeed');
    }
  }

  async listAction() {
    const user = this.mongo('user');
    const data = await user.find();
    return this.success(data, 'Done');
  }

  async saveDayAction() {
    const day = this.mongo('day');
    const reqDate = this.post('date');
    const h = this.post('h');
    const s = this.post('s');
    const l = this.post('l');
    const text = this.post('text');
    const dayDoc = await day.where({
      date: new Date(reqDate)
    }).find();
    if (!think.isEmpty(dayDoc)) {
      const affected = await day.where({
        date: new Date(reqDate)
      }).update({
        date: new Date(reqDate),
        h: h,
        s: s,
        l: l,
        text: text
      });
      return this.success({}, 'Updated Succeed');
    } else {
      const inserId = await day.add({
        date: new Date(reqDate),
        h: h,
        s: s,
        l: l,
        text: text
      });
      return this.success({}, 'Created Succeed');
    }
  }

  async getDayAction() {
    const day = this.mongo('day');
    const date = this.get('date');
    const result = await day.where({
      date: new Date(date)
    }).find();

    if (!think.isEmpty(result)) {
      return this.success({
        color: `hsl(${result.h}, ${result.s}, ${result.l})`,
        text: result.text
      }, 'Done');
    } else {
      return this.fail(15, 'No such day!', {});
    }
  }
  async getMonthAction() {
    const day = this.mongo('day');
    const date = this.post('date');
    if (!date) {
      return this.fail(400, 'Bad Requrest');
    }
    const trueDate = new Date(date);
    const result = await day.where({
      date: {
        $gte: new Date(trueDate.getFullYear(), trueDate.getMonth(), 1),
        $lte: new Date(trueDate.getFullYear(), trueDate.getMonth() + 1, 0)
      }
    }).select();
    const finalResult = result.map((item) => {
      return {
        day: item.date.getDay(),
        color: `hsl(${item.h}, ${item.s}, ${item.l})`,
        text: item.text,
        date: item.date
      };
    });
    return this.success(finalResult, 'Done');
  }

  async addMuchAction () {
    const day = this.mongo('day');
    const reqDate = this.post('date');
    const h = this.post('h');
    const s = this.post('s');
    const l = this.post('l');
    const text = this.post('text');
    let arr = []
    for (let i = 0; i < 60; i++) {
      arr.push(
        {
          date: new Date(new Date(reqDate).getTime() + 24 * 60 * 60 * 1000 * i),
          h: '255',
          s: '50%',
          l: '30%',
          text: 'testText'
        }
      );
    }
    day.addMany(arr);
  }
};
