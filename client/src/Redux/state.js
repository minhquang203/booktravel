import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user; // Sửa 'playload' thành 'payload'
      state.token = action.payload.token; // Sửa 'playload' thành 'payload'
    },
  },
});

export const { setLogin } = userSlice.actions; // Đảm bảo export action đúng
export default userSlice.reducer; // Đảm bảo export reducer đúng
