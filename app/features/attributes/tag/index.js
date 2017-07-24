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
    const resources = this.getManager().getRootManager().getStore().getState().resources;
    return Object.keys(resources).reduce((sum, resourceId) => {
      const tagAttribute = resources[resourceId][attributeId];
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

  async onBeforeCreate (tags, attribute, resource) {
    const typedTag = tags.find(tag => typeof tag === "object");
    if (typedTag) {
      return tags.filter(tag => typeof tag !== "object").concat(typedTag.value);
    }
    return tags;
  }

  async onBeforeUpdate (files, attribute, resource) {
    return await this.onBeforeCreate(files, attribute, resource);
  }
}
