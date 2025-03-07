import { getPosts, PrivateNotionApi } from "@/lib/notion";
import { Post } from "@/lib/notion/types";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const url = new URL(request.url).pathname.split("/");
        const id = url[url.length - 1];

        const response = await getPosts({ filter: {
            property: "slug",
            rich_text: { 
                equals: id as string,
            }
        }});
        
        if (response.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        } 

        try {
            const postFindResult = response?.[0] as Post;
            const post = await PrivateNotionApi.getPage(postFindResult?.id, {});            
            return NextResponse.json(post, { status: 200 });
        } catch (error) {
            console.error("Error fetching posts:", error);
            return NextResponse.json({ error: "Error fetching posts", details: (error as any).toString() }, { status: 404 });
        }
    
    } catch (error) {
        return NextResponse.json({ error: "Error fetching posts", details: error }, { status: 500 });
    }
}
