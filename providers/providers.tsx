"use client";

import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
        <ReactQueryDevtools initialIsOpen={true} buttonPosition={"bottom-left"} />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}