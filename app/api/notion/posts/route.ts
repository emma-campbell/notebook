import { NotionApi } from "@/lib/notion";
import { getDateProperty, getStringProperty } from "@/lib/notion/utils";
import { NextResponse } from "next/server";

import type { Post } from "@/lib/notion/types";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const response = await NotionApi.databases.query(body);
        
        const posts: Post[] = [];
        
        for (const item of response.results) {  
            if (!("properties" in item)) continue;
            const post: Post = {
                id: item.id,
                title: getStringProperty(item, "title"),
                slug: getStringProperty(item, "slug"),
                description: getStringProperty(item, "description"),
                published: getDateProperty(item, "published"),
                revised: getDateProperty(item, "revised"),
                category: getStringProperty(item, "category"),
                status: getStringProperty(item, "status")
            }

            const requiredProperties = ["slug", "title", "category", "status"];
            const isComplete = requiredProperties.every((key) => Boolean(post[key as keyof Post]));
            
            if (isComplete) {
                posts.push(post);
            }
        };

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
    }
}


