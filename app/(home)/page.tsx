"use client";

import { Layout } from "@/components/layout/Layout";
import { usePosts } from "@/hooks/usePosts";
import type { Post } from "@/lib/notion/types";
import { DateTime } from "luxon";
import Link from "next/link";
import { keepPreviousData } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";

const POSTS_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE_ID as string;
const ENVIRONMENT = process.env.NODE_ENV;

export default function Home() {

    const query = ENVIRONMENT !== "development" && {
        filter: {
            property: "status",
            select: {
                equals: "Published",
            }
        }
    }

    const { data, error, isError } = usePosts(POSTS_ID, {
        ...query,
        sorts: [
            {
                property: "status",
                direction: "descending",
            },
            {
                property: "published",
                direction: "descending",
            }
        ],
    }, {
        queryKey: ["posts", POSTS_ID, query],
        placeholderData: keepPreviousData
    });

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Layout>
            <Hero />
            <div className="border-4 border-accent/30 rounded-2xl px-4 py-4">
                <div className="flex items-center justify-center w-full pb-2">
                    <h1 className="text-4xl font-bold uppercase">Posts</h1>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    {data?.map((post) => (
                        <PostPreview key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

const PostPreview = ({ post }: { post: Post }) => {
    const slug = post.slug;
    return (
        <Link href={`/posts/${slug}`}>
            <div className="flex-col gap-4 items-center hover:bg-accent/50 dark:hover:bg-accent/20 p-4 rounded-md hover:cursor-pointer">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="font-heading uppercase font-black">{post.title}</h2>
                </div>
                {post.description && <p className="text-sm font-serif font-regular">{post.description}</p>}
            </div>
        </Link>
    )
}


