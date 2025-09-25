"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { SessionProvider } from 'next-auth/react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Header } from '@/components/layouts/header';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConvexProvider client={convex}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </ConvexProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Provider;