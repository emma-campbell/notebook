"use client";

import { Post } from "@/lib/notion/types";
import { NotionPage } from "./NotionPage";
import { usePost } from "@/hooks/usePost";

export function PostContent({ post }: { post: Partial<Post> }) {
    const { data } = usePost(post?.id as string);

    return (
        <section className="w-full">
            <NotionPage recordMap={data} />
        </section>
    )
}