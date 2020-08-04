import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { SET_TOKEN, SET_IS_AUTH } from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuth: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setToken = async (token) => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
  };

  const setIsAuth = async (value) => {
    dispatch({
      type: SET_IS_AUTH,
      payload: value,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        setToken,
        setIsAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
