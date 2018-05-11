const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    let userinfo = await this.session('userinfo');
    if (!think.isEmpty(userinfo)) {
      this.success(userinfo, 'Done1');
    } else {
      this.fail(11, `Didn't match`, {});
    }
  }

  async loginAction() {
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
        return this.success({}, 'Done');
      }
    }
  }

  async logoutAction() {
    await this.session();
    return this.success({}, 'Logout succeed');
  }

  async signupAction() {
    const user = this.mongo('user');
    user._pk = 'username';
    let username = this.post('username');
    let pwd = this.post('pwd');
    if (!think.isEmpty(await user.find({username: username}))) {
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
    const reqDate = this.post('date');
    const h = this.post('h');
    const s = this.post('s');
    const l = this.post('l');
    const dairy = this.post('dairy');

    const dayDoc = day.where({date: new Date(reqDate)}).find();
    if (!think.isEmpty(dayDoc)) {
      const affected = await day.where({date: new Date(reqDate)}).update(
        {
          date: new Date(reqDate),
          h: h,
          s: s,
          l: l,
          dairy: dairy
        }
      );
      return this.success({}, 'Updated Succeed');
    } else {
      const inserId = await day.add({
        date: new Date(reqDate),
        h: h,
        s: s,
        l: l,
        dairy: dairy
      });
      return this.success({}, 'Created Succeed');
    }
  }

  async getMonth () {
    const date = this.post('date');
    
  }
};
