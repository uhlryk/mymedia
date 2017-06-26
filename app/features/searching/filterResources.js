export default function filterResources (resources, search, attributes, extensions) {
  let quickSearchFilteredResources = search.quickSearch ? filterQuickSearch(resources, search, attributes, extensions) : resources;
  return quickSearchFilteredResources;
}

function filterQuickSearch(resources, search, attributes, extensions) {
  return resources.filter(resource => Object.keys(attributes).some(attributeId => getExtensionByName(extensions, attributes[attributeId].extensionName).getQuickSearchFunction(search.quickSearch)(resource[attributeId])))
}

function getExtensionByName(extensions, attributeName) {
  return extensions.attributes.getExtensionByName(attributeName)
}
