import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import LayoutApp from "../components/layout";
import "antd/dist/antd.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <LayoutApp>
          <Component {...pageProps} />
        </LayoutApp>
      </Provider>
    </React.StrictMode>
  );
}
