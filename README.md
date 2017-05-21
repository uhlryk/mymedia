# Mymedia



## Configuration

Project based on boilerplate :

https://github.com/chentsulin/electron-react-boilerplate

### Run Project
```
$ npm run dev
```

### Package
```
$ npm run package-all
```

## Development


### Attribute Extensions 

#### Create attribute extension instance in project


#### Create attribute from attribute extension instance

##### From project extension

```
  this.createAttribute(<attributeId>, <attributeExtensionName>, <configuration>);
```

##### From any location with dispatch

```
  import { addNewAttributeWithId } from "./actions/attributes";
  dispatch(
    addNewAttributeWithId(<attributeId>, <attributeExtensionName>, <configuration>)
  )
```

- **attributeId** *unique identifier for attribute. e.g. description, quality, attributes created dynamically* 
- **attributeExtensionName** *each extension has it name which is unique id of extension*
- **configuration** 
  - **extensionName** *name of extension attribute*
  - **all** *it affects all modes*
    - **displayName**
    - **className**
  - **view** *affects only view mode, override all for view*
    - **displayName**
    - **className**
    - **hidden** bool **false** *will be hidden in listing and details view*
    - **listing** bool **false** *will be visible in row list* 
  - **edit** *affects only edit mode, override all for edit*
    - **displayName**
    - **className**
    - **disabled** bool **false** *can be visible in form but not editable*
    - **hidden** bool **false** will be not visible in form
  - **settings** 
  - **sort**  
    - **disable** bool **false** disallow sort by this attribute
