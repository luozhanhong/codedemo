module.exports = class {
  constructor(ctx) {
    this.ctx = ctx;

    let category = (new Error()).stack.split('\n')[2];
    category = category.substring(category.indexOf('(') + 1, category.lastIndexOf('.') + 3);
    this.logger = getLogger(category);
  }
};
