import { SET_TOKEN, SET_IS_AUTH } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };

    default:
      return state;
  }
};
