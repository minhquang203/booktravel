import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material"; // Thêm vào đây

// Tạo theme tùy chỉnh nếu cần thiết
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Màu chủ đạo
    },
    secondary: {
      main: "#dc004e", // Màu phụ
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}> {/* Thêm ThemeProvider */}
          <CssBaseline /> {/* Đảm bảo các giá trị mặc định của MUI như font, margin, padding */}
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
