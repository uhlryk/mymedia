export default function sortResources (resources, sortList, attributes, extensions) {
  return sortList.reduce((sortedList, sortAttribute) => sortedList.sort(
    extensions.attributes
      .getExtensions()
      .find(extension => extension.getName() === attributes[sortAttribute.id].extensionName)
      .getSortFunction(sortAttribute.id, sortAttribute.order)
  ), resources);
}
