import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthorized: localStorage.getItem("userInfo") ? true : false,
    email: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).user.email
      : null,
    name: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).user.name
      : null,
    token: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null,
    isEmailVerified: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).user.isEmailVerified
      : false,
  },
  reducers: {
    appLogin: (state, action) => {
      const { payload } = action;
      const { data } = payload;
      const { token, user } = data;
      state.isAuthorized = true;
      state.email = user.email; //action.payload.data.user.email
      state.name = user.name; //action.payload.data.user.name
      state.token = token; //action.payload.data.token
      state.userId = user._id; //action.payload.data.token
      state.isEmailVerified = user.isEmailVerified; //action.payload.data.user.email
      localStorage.setItem("userInfo", JSON.stringify(data));
    },

    appLogout: (state) => {
      state.isAuthorized = false;
      state.email = null; //action.payload.data.user.email
      state.name = null; //action.payload.data.user.name
      state.token = null; //action.payload.data.token
      state.isEmailVerified = false; //action.payload.data.user.email
      localStorage.removeItem("userInfo");
    },
    emailVerified : (state) =>{
      state.isEmailVerified = true;
      localStorage.setItem("userInfo", JSON.stringify({
        user : {
          email : state.email,
          name : state.name,
          isEmailVerified : state.isEmailVerified,
          _id : state.userId,
        },
        token : state.token,
      }));
    },
  },
});

export const { appLogin, appLogout , emailVerified } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
