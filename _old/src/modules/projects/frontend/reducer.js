import _ from "lodash";
import * as actionTypes from "./actionTypes";

export default function projects(state = [], action) {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return action.payload.list ? _.cloneDeep(action.payload.list) : [];
        default:
            return state;
    }
}
