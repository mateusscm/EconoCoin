import { FA } from "../../Firebase";

export const login = () => {
  return async dispatch => {
    try {
      console.log("Login with redux -> Success");
      return dispatch({ type: "LOGIN", payload: FA.currentUser });
    } catch (error) {
      console.log("Login with redux -> Failed");
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT" });
    set("user", null);
  };
};
