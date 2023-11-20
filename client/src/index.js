import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.scss";
import { store } from './store/store';
import "bootstrap/dist/js/bootstrap.min.js";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "react-admin";
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";


//u can provide anu theme you choose
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
    <Provider store={store}> 
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
