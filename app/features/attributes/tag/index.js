import Form from "./Form.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class TagAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("tag");
    this.setDisplayName("tag");
    this.setEdit(Form);
    this.setCreate(Form);
    this.setView(View);
    this.disableSortable();
  }

  getEdit (props) {
    return super.getEdit(Object.assign({}, props, { suggested: this.getExistingTags(props.id) }));
  }

  getCreate (props) {
    return super.getEdit(Object.assign({}, props, { suggested: this.getExistingTags(props.id) }));
  }

  getExistingTags (attributeId) {
    const fileList = this.getManager().getRootManager().getStore().fileList;
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
