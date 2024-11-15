import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // Thông tin người dùng
  token: null,  // Token đăng nhập
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Đăng nhập thành công, lưu thông tin người dùng và token
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Đăng xuất, xóa thông tin người dùng và token
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Cập nhật thông tin người dùng
    setUserDetails: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Export các action để sử dụng
export const { setLogin, setLogout, setUserDetails } = userSlice.actions;

// Export reducer để thêm vào store
export default userSlice.reducer;
