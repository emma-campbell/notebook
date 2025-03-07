import { useQuery } from "@tanstack/react-query";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { Post } from "@/lib/notion/types";

const queryFn = async (query: QueryDatabaseParameters): Promise<Post[]> => {
    const response = await fetch("/api/notion/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    const data = await response.json() as Post[];
    return data;
}

export const usePosts = (id: string, query: Omit<QueryDatabaseParameters, "database_id">) => {
    return useQuery({
        queryKey: ["posts", id, query],
        queryFn: () => queryFn({ database_id: id, ...query }),
    })
}