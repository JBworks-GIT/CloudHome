import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./src/store/appStore";
import AppRouter from "./appRouter";
//const app = <h1>hello</h1>  is a element(react)
import "./globalStyles.css";

const App = () => {  
  return (
    <Provider store={appStore}>
      <AppRouter/>
    </Provider>
  );
};

//to avoid accidental rerender of all components when only few
//need rerender we use redux instead of context

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(App());
