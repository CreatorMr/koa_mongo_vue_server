const UserModel = require('./schema.js')


class User {
  constructor() {
    this.model = UserModel
  }

  save(opts) {
    return new UserModel(opts).save((err) =>{
      if(err) return handleError(err)
      // saved
    })
  }

  query(opts = {}) {
    return this.model.find(opts).exec();
  }
}
module.exports = User