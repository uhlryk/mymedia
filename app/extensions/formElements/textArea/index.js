import Settings from "./Settings.jsx";
import FormElement from "./FormElement.jsx";
import View from "./View.jsx";

function getConfig() {
  return {
    key: "text-area",
    name: "text area",
    type: "form-element"
  };
}

function onRegister(extensioManager) {

}

export default {
  getConfig,
  onRegister,
  Settings,
  FormElement,
  View
}
