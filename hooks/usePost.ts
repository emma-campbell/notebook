import { useQuery } from "@tanstack/react-query";

const queryFn = async (slug: string) => {
    const response = await fetch(`/api/notion/post/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
}

export const usePost = (slug: string) => {
    return useQuery({
        queryKey: ["posts", slug],
        queryFn: () => queryFn(slug),
    })
}