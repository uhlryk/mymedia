import Settings from "./Settings.jsx";
import FormElement from "./FormElement.jsx";
import View from "./View.jsx";

function getConfig() {
  return {
    name: "input",
    key: "input",
    type: "form-element"
  };
}

function onRegister(extensionManager) {

}

export default {
  getConfig,
  onRegister,
  Settings,
  FormElement,
  View
}
