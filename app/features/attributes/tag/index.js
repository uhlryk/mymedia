import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class TagAttributesExtension extends AttributesExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "tag", AttributesExtension.mergeConfiguration({

      view: {
        component: View
      },
      edit: {
        component: FormField
      },
      create: {
        component: FormField
      },
      settings: {
        displayName: "tag",
      },
      sort: {
        disabled: true
      }
    }, configuration));
  }

  getEdit (props) {
    return super.getEdit(Object.assign({}, props, { suggested: this.getExistingTags(props.id) }));
  }

  getCreate (props) {
    return super.getEdit(Object.assign({}, props, { suggested: this.getExistingTags(props.id) }));
  }

  getExistingTags (attributeId) {
    const fileList = this.getManager().getRootManager().getStore().getState().fileList;
    return Object.keys(fileList).reduce((sum, fileName) => {
      const tagAttribute = fileList[fileName][attributeId];
      if(tagAttribute) {
        tagAttribute.forEach(tag => sum.add(tag))
      }
      return sum;
    }, new Set());
  }

  getQuickSearchFunction (search) {
    return (values = []) => {
      return values.find(value => value.toLowerCase().includes(search.toLowerCase()));
    }
  }
}
