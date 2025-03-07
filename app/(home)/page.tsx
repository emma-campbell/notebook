"use client";

import { Layout } from "@/components/layout/Layout";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/lib/notion/types";
import { DateTime } from "luxon";
import Link from "next/link";
import { useMemo } from "react";

const POSTS_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE_ID as string;
const ENVIRONMENT = process.env.NODE_ENV;

export default function Home() {
    const query = useMemo(() => {
        if (ENVIRONMENT === "development") {
            return undefined;
        }

        let filter: any = undefined;
        if (ENVIRONMENT === "production") {
            filter = {
                property: "status",
                select: {
                    equals: "Published",
                }
            }
        }

        const query: any = {
            sorts: [{
                property: "published",
                direction: "descending",
            }],
        }

        if (filter) {
            query.filter = filter;
        }

        return query;
    }, []);

    const { data, error, isError } = usePosts(POSTS_ID, query);

    console.debug(data);

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
        <div className="flex gap-4 items-center">
            <Link href={`/posts/${slug}`} className="hover:bg-blue-50 hover:underline">
                <h2>{post.title}</h2>
            </Link>
            { post.published && <p>{published.toLocaleString(DateTime.DATE_MED)}</p> }
            { post.status == "draft" && <p className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Draft</p> }
        </div>
    )
}


