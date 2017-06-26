export default function sortResources (resources, sortList, attributes, extensions) {
  return sortList.reduce((sortedList, sortAttribute) => sortedList.sort(
    (a, b) => {
      var aAttribute = a[sortAttribute.id] || attributes[sortAttribute.id].defaultValue || 0;
      var bAttribute = b[sortAttribute.id] || attributes[sortAttribute.id].defaultValue || 0;

      return extensions.attributes
        .getExtensionByName(attributes[sortAttribute.id].extensionName)
        .getSortFunction(sortAttribute.order)(aAttribute, bAttribute)
    }), resources);
}
