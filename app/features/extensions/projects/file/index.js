import ProjectsExtension from "../ProjectsExtension";
import InputExtension from "../../formElements/input/index";
import TextAreaExtension from "../../formElements/textArea/index";
import RatingExtension from "../../formElements/rating/index";

export default class extends ProjectsExtension {
  constructor () {
    super();
    this.setDisplayName("file");
    this.setName("file");
    this.setDescription("Any files");

    this.addRule(".*");//all files
  }

  registerExtensions (registerExtension) {
    super.registerExtensions(registerExtension);
    registerExtension(new InputExtension());
    registerExtension(new TextAreaExtension());
    registerExtension(new RatingExtension());
  }

  onCreate (createFormElement) {
    super.onCreate(createFormElement);
    createFormElement("description-id", "Description", TextAreaExtension.TYPE, {
      viewClassName: "file-list__description"
    });
  }
}
