export const UPDATE_TAGS = "tag_list.update_tags";
export function updateTags() {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TAGS,
      tags: [...new Set(Object.keys(getState().fileList).map(hash => getState().fileList[hash].tags).reduce((prevVal, tags) => prevVal.concat(tags),[]))]
    });
  }
}
