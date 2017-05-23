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

### Project Extensions

This is a class which extending ProjectExtension.

#### Create new project Extension

Class extends `ProjectExtension`

##### In constructor :

```
super(<projectExtensionName>, <configuration>)
```

- **projectExtensionName** *each extension has it name which is unique id of extension*
- **configuration** 
  - **displayName**
  - **description**

### Attribute Extensions 

This is a class which extending AttributeExtension. It is responsible for creating resource attributes.

#### Create new attribute Extension

Class extends `AttributesExtension`

##### In constructor :

```
super(<attributeExtensionName>, <configuration>)
```

- **attributeExtensionName** *each extension has it name which is unique id of extension*
- **configuration** 
  - **view** 
    - **component** **null** react component which render attribute view
  - **edit** 
    - **component** **null** react component which render attribute edit
  - **create** 
    - **component** **null** react component which render attribute create
  - **settings** - in future settings will not have component
    - **displayName**
    - **createDisabled** **false** disallow creating new attribute
    - **editDisabled** **false** disallow editing attribute
    - **deleteDisabled** **false** disallow deleting attribute
    - **component** **null** react component which render attribute settings
  - **sort**
    - **disabled** **false** 

#### Register attribute extension instance in project extension

In `init` method of project extension 

```
  this.someExtension = new SomeAttributeExtension()
  this.getManager().getRootManager().attributes.registerExtension(this.someExtension);
```

#### Create attribute from attribute extension instance

##### In project extension

```
  this.createAttribute(<attributeId>, <attributeExtensionName>, <configuration>);
```

##### In any location with dispatch

```
  import { addNewAttributeWithId } from "./actions/attributes";
  dispatch(
    addNewAttributeWithId(<attributeId>, <attributeExtensionName>, <configuration>)
  )
```

- **attributeId** *unique identifier for attribute. e.g. description, quality, attributes created dynamically* 
- **attributeExtensionName** *each extension has it name which is unique id of extension*
- **configuration** 
  - [auto]**id** = **attributeId**
  - [auto]**extensionName** = **attributeExtensionName**
  - **displayName**
  - **className**
  - **view** *affects only view mode*
    - **displayName**
    - **className**
    - **hidden** bool **false** *will be hidden in listing and details view*
    - **listing** bool **false** *will be visible in row list* 
  - **edit** *affects only edit mode*
    - **displayName**
    - **className**
    - **disabled** bool **false** *can be visible in form but not editable*
    - **hidden** bool **false** will be not visible in form
  - **create** *affects only create mode*
    - **displayName**
    - **className**
    - **disabled** bool **false** *can be visible in form but not editable*
    - **hidden** bool **false** will be not visible in form
  - **settings** 
  - **sort**  
    - **disabled** bool **false** disallow sort by this attribute
