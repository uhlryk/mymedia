export default class BaseExtension {
  getName () {
    return this.name;
  }
  setName (name) {
    this.name = name;
  }
  getType () {
    return this.type;
  }
  setType (type) {
    this.type = type;
  }
  onRegister (extensionManager) {

  }

}
