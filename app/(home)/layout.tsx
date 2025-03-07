"use client";

import { Provider as QueryProvider } from "@/state/query";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
}