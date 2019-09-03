import BaseExtension from "./Extension";
export default class Extension extends BaseExtension {

  constructor(extensionName, ...configurations) {
    super(extensionName, ...configurations);
    this.listeners = {};
  }

  setRequestRendererListener(command, listener) {
    this.listeners[command] = listener;
  }

  async responseMainProcess (command, ...requestData) {
    if (this.listeners[command]) {
      return await this.listeners[command](...requestData);
    }
  }
}
