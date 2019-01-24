'use strict';
const env = process.env.USER;

/**
 *
 * Class to model data according to mongo schema
 * @class ToMongo
 */
class ToMongo {
  /**
   * Creates an instance of ToMongo.
   * @param {array} tags user generated tags
   * @param {string} str user generated notes
   * @memberof ToMongo
   */
  constructor(tags, str) {
    this.note = str;
    this.user = env;
    this.tags = [...tags];
  }
}

module.exports = ToMongo;