const lowdb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

class Storage {
  constructor() {
    this.path = `${__dirname}/db.json`
    this.setup()
  }

  async setup() {
    const adapter = new FileSync(this.path)
    this.db = lowdb(adapter)
    this.db.defaults({ transfers: [], transactions: [] }).write()
  }

  get(key) {
    return this.db.get(key)
  }

  setTransactionPaid(id, value) {
    return this.db.get('transactions').find(item => {
      return `${item.id}` === `${id}`;
    }).assign({ paid: value }).write()
  }
}

module.exports = {
  storage: new Storage(),
}
