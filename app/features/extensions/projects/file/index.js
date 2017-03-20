import ProjectsExtension from "../ProjectsExtension";
import InputExtension from "../../formElements/input/index";
import TextAreaExtension from "../../formElements/textArea/index";
import RatingExtension from "../../formElements/rating/index";
import FileSize from "../../formElements/fileSize/index";

export default class extends ProjectsExtension {
  constructor () {
    super();
    this.setDisplayName("file");
    this.setName("file");
    this.setDescription("Any files");

    this.addRule(/.*/);//all files
  }

  registerExtensions (registerExtension) {
    super.registerExtensions(registerExtension);
    registerExtension(new InputExtension());
    registerExtension(new TextAreaExtension());
    registerExtension(new RatingExtension());
    registerExtension(new FileSize());
  }

  /**
   *
   * @param createFormElement function for creating form elements. Get attrs(uniqueId, displayName, Type, settings)
   * Settings can have additional fields:
   *   viewClassName css class for view part of element
   *   editClassName css class for edit part of element
   *   isRequired if required then in edit field can't be empty
   *   alwaysVisible it is visible always in resource otherwise only after more button
   *   disableEdit disable editing file, it will not show on form
   */
  onCreate (createFormElement) {
    super.onCreate(createFormElement);
    createFormElement("name-id", "", InputExtension.TYPE, {
      viewClassName: "file-list__name",
      alwaysVisible: true
    });

    createFormElement("path-id", "", InputExtension.TYPE, {
      viewClassName: "file-list__original-path",
      alwaysVisible: true,
      disableEdit: true
    });

    createFormElement("description-id", "Description", TextAreaExtension.TYPE, {
      viewClassName: "file-list__description"
    });


  }

  mapFileProperties (file) {
    return Object.assign({}, file, {
      "name-id": file.name,
      "path-id": file.path
    });
  }
}
