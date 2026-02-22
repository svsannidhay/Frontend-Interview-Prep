import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const AppContainer = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppContainer;
