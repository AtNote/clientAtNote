'use strict';
const env = process.env.USER;

class ToMongo {
  constructor(tags, str) {
    this.note = str;
    this.user = env;
    this.tags = [...tags];
  }
}

module.exports = ToMongo;