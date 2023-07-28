"use client";
import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  QueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "design-system";

// ReactGA.initialize("G-QL0WF8XH3D")
const queryClient = new QueryClient();

const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default ThemeProvider;
