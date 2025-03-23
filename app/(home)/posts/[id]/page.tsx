"use client";

import { usePost } from "@/hooks/usePost";
import { useParams } from "next/navigation";
import { NotionPage } from "@/components/NotionPage";
import { getPageTitle } from "notion-utils";
import { Layout } from "@/components/layout/Layout";

export default function Post() {
    const { id } = useParams<{ id: string }>();
    const { data } = usePost(id as string);

    if (!data) {
        return <div>Loading...</div>;
    }

    console.log(data);

    const title = getPageTitle(data?.content);

    return <Layout>
        <section className="flex flex-col gap-2 items-start w-full pl-4">
            <div className="flex items-center gap-2 justify-between w-full">
                <h1 className="text-3xl font-bold">{title}</h1>
                {data?.meta?.category && <p className="text-sm text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-xs">{data?.meta?.category}</p>}
            </div>
            {/* {published && <span className="text-sm text-gray-500 dark:text-gray-400">{formatDistanceToNow(published.toJSDate(), { addSuffix: true })}</span>} */}
        </section>
        <section className="w-full">
            <NotionPage recordMap={data?.content} />
        </section>
    </Layout>;
}
