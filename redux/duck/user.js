import { createSlice } from "@reduxjs/toolkit";

//cookies
import { getCookie } from "cookies-next";

export const setLoggedState = (obj) => (dispatch) => {
  try {
    return dispatch(setLoggedStateAction(obj));
  } catch (err) {
    console.error(err);
  }
};

export const saveUserData = (userData) => (dispatch) => {
  try {
    return dispatch(saveUserDataAction(userData));
  } catch (err) {
    console.error(err);
  }
};

const userDuck = createSlice({
  name: "userDuck",
  initialState: {
    isLoggedIn:
      typeof window !== "undefined"
        ? !!getCookie("userOnlus")
          ? JSON.parse(getCookie("userOnlus")).userId
          : false
        : false,
    userData: {},
  },
  reducers: {
    setLoggedStateAction: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    saveUserDataAction: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export default userDuck.reducer;

const { setLoggedStateAction, saveUserDataAction } = userDuck.actions;
