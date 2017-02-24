import Settings from "./Settings.jsx";
import FormElement from "./FormElement.jsx";
import View from "./View.jsx";

function getConfig() {
  return {
    name: "rating",
    key: "rating",
    type: "form-element"
  };
}

function onRegister(extensioManager) {

}

export default {
  getConfig,
  onRegister,
  getSettings: () => Settings,
  getFormElement: () => FormElement,
  getView: () => View
}
