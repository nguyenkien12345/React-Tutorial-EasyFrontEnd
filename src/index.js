import { SnackbarProvider } from 'notistack';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import store from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* Hiển thị thông báo: SnackbarProvider */}
        <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

// ReactDOM sẽ render cái phần app ở chế độ strict mode vào cái node root
