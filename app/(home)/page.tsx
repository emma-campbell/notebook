"use client";

import { Layout } from "@/components/layout/Layout";
import { usePosts } from "@/hooks/usePosts";
import type { Post } from "@/lib/notion/types";
import { DateTime } from "luxon";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { keepPreviousData } from "@tanstack/react-query";

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
        <div>
            <Layout>
                <h1 className="text-4xl font-bold">Posts</h1>
                <div>
                    {data?.map((post) => (
                        <PostPreview key={post.id} post={post} />
                    ))}
                </div>
            </Layout>
        </div>
    )
}

const PostPreview = ({ post }: { post: Post }) => {
    const published = DateTime.fromISO(post.published as any);
    const slug = post.slug;
    return (
        <Link href={`/posts/${slug}`}>
            <div className="flex-col gap-4 items-center hover:bg-gray-200/50 dark:hover:bg-gray-900/50 p-4 rounded-md hover:cursor-pointer">
                <div className="flex items-center justify-between gap-2">
                    <h2>{post.title}</h2>
                    {post.status === "draft" && <p className="text-green-100 bg-green-700 px-1 rounded-sm">Draft</p>}
                </div>
                <div className="flex items-center justify-between gap-2">
                    {post.published && <p>{formatDistanceToNow(published.toJSDate(), { addSuffix: true })}</p>}
                    {post.revised && <i className="text-xs">Revised {formatDistanceToNow(post?.revised as any, { addSuffix: true })}</i>}
                </div>
            </div>
        </Link>
    )
}


