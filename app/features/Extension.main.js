export default class Extension extends BaseExtension {

  constructor(extensionName, ...configurations) {
    super(extensionName, ...configurations);
    this.listeners = {};
  }

  setRequestRendererListener(command, listener) {
    this.listeners[command] = listener;
  }

  responseMainProcess (evt, command, ...requestData) {
    if (this.listeners[command]) {
      this.listeners[command](evt, ...requestData);
    }
  }
}
