// Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm.
import _ from "lodash";

import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // MapKeys returns an object where the 'id' of the elements in action.payload is the key of each element
      return { ...state, ..._.mapKeys(action.payload, "id") };
    /*
    For the cases of create , fetch and edit one stream, we have to perform the same operation:
    Create a new state object with the old state's data and add if not present we add the payload result coming from the api's call 
    (if present is "overwritten" P.S. LOOK that there should be not side effect, that's why we return a new object and we do not modify directly the one we already had)
    */
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_STREAM:
      // Omit returns a new array without action.payload (that contains in this case the id of the element to delete)
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
