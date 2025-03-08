"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

export function Provider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
            }
        }
    }))

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}