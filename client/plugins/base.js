export default class  {

  constructor(context, options) {
    this.context = context;
    this.options = options ? options : {};
    this.init();
    this.register();
  }

  register() {
    if (this.name)
      this.context[this.name] = this.provider();
  }

  provider() {
    return this;
  }

  init() {
    // Implement Me
  }

}
